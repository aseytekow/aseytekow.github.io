async function fetchGitHubProjects() {
  const username = "aseytekow";
  const projectGrid = document.querySelector(".project-grid");

  try {
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
    projectGrid.innerHTML = "<p>A problem occurred while loading the projects.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchGitHubProjects);
