import { NextResponse } from 'next/server';

type SearchItem = {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  closed_at: string | null;
  pull_request?: { merged_at?: string | null };
};

async function publicPullRequests(query: string) {
  const status = query.includes('is:merged')
    ? 'is:merged'
    : query.includes('is:open')
      ? 'is:open'
      : 'is:closed is:unmerged';
  const params = new URLSearchParams({
    q: `author:dark7462 is:pr ${status}`,
    per_page: '100',
    sort: 'updated',
    order: 'desc',
  });
  const response = await fetch(`https://api.github.com/search/issues?${params}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    next: { revalidate: 300 },
  });
  if (!response.ok) return NextResponse.json({ error: 'GitHub contributions are unavailable' }, { status: 502 });
  const data = (await response.json()) as { items?: SearchItem[] };
  const edges = (data.items ?? []).map((item) => ({
    node: {
      id: item.id,
      title: item.title,
      url: item.html_url,
      repository: { nameWithOwner: item.html_url.split('/').slice(3, 5).join('/') },
      state: item.pull_request?.merged_at ? 'MERGED' : item.state.toUpperCase(),
      createdAt: item.created_at,
      mergedAt: item.pull_request?.merged_at,
      closedAt: item.closed_at,
    },
  }));
  return NextResponse.json({ data: { search: { edges } } });
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (typeof query !== 'string') return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
    const token = process.env.GITHUB_TOKEN || "";

    if (!token) {
      return publicPullRequests(query);
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub API Proxy Error:", error);
    return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: 500 });
  }
}
