document.addEventListener("DOMContentLoaded", () => {
    const newRepoButton = document.getElementById("newRepoButton");
    const newRepoForm = document.getElementById("newRepoForm");
    const cancelButton = document.getElementById("cancelButton");
    const repoList = document.getElementById("repoList");
    const repoTitle = document.getElementById("repoTitle");
    const repoDescription = document.getElementById("repoDescription");
  
    let repositories = [];
  
    const renderRepositories = () => {
      repoList.innerHTML = "";
      if (repositories.length === 0) {
        repoList.innerHTML = `
          <div class="empty-state">
            <div class="icon-folder">📂</div>
            <h3>No repositories</h3>
            <p>Get started by creating a new repository</p>
          </div>`;
      } else {
        repositories.forEach((repo, index) => {
          const repoDiv = document.createElement("div");
          repoDiv.className = "repo";
          repoDiv.innerHTML = `
            <div>
              <h3>${repo.title}</h3>
              <p>${repo.description}</p>
              <p>Created on ${repo.createdAt}</p>
            </div>
            <button class="delete-button" data-index="${index}">❌</button>
          `;
          repoList.appendChild(repoDiv);
        });
  
        document.querySelectorAll(".delete-button").forEach((button) => {
          button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            repositories.splice(index, 1);
            renderRepositories();
          });
        });
      }
    };
  
    newRepoButton.addEventListener("click", () => {
      newRepoForm.classList.remove("hidden");
    });
  
    cancelButton.addEventListener("click", () => {
      newRepoForm.classList.add("hidden");
    });
  
    newRepoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      repositories.push({
        title: repoTitle.value,
        description: repoDescription.value,
        createdAt: new Date().toLocaleDateString(),
      });
      repoTitle.value = "";
      repoDescription.value = "";
      newRepoForm.classList.add("hidden");
      renderRepositories();
    });
  
    renderRepositories();
  });
  