async function fetchGitHubProjects() {
  const username = "aseytekow";
  const projectGrid = document.querySelector(".project-grid");
  const profileImg = document.querySelector('img[alt="Profile picture"]');
  const fullNameElement = document.querySelector(".contact-section h2"); // İsmin olduğu yer
  const userNameLink = document.querySelector(".username");

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    if (profileImg && userData.avatar_url) {
      profileImg.src = userData.avatar_url;
    }

    if (fullNameElement && userData.name)
      fullNameElement.textContent = userData.name;

    if (userNameLink && userData.login)
      userNameLink.textContent = `@${userData.login}`;

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );
    const repos = await response.json();

    projectGrid.innerHTML = "";

    repos.forEach((repo) => {
      if (!repo.fork) {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description."}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-github">GitHub</a>
                        </div>
                    `;
        projectGrid.appendChild(card);
      }
    });
  } catch (error) {
    console.error("GitHub API Hatası:", error);
    projectGrid.innerHTML =
      "<p>A problem occurred while loading the projects.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchGitHubProjects);
