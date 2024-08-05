async function fetchMediumPosts() {
  const username = "dibaekhanal101";
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
  );
  const data = await response.json();

  const feedContainer = document.getElementById("medium-feed");
  const posts = data.items.slice(0, 4); // Get only the 3 most recent posts

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("medium-post");

    // Extracting a short description
    const description = post.description.split(" ").slice(0, 0);

    postElement.innerHTML = `
            <a href="${post.link}" target="_blank">${post.title}</a>
            <p>${description}</p>
        `;

    feedContainer.appendChild(postElement);
  });
}

fetchMediumPosts();

async function fetchGitHubRepos() {
  const username = "dibae101";
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();

  const feedContainer = document.getElementById("github-feed");
  const repos = data.slice(0, 3); // Get only the 3 most recent repos

  repos.forEach((repo) => {
    const repoElement = document.createElement("div");
    repoElement.classList.add("github-repo");

    repoElement.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;

    feedContainer.appendChild(repoElement);
  });
}

fetchGitHubRepos();
