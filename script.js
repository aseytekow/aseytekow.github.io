async function fetchData() {
  const username = "aseytekow";
  const profileImg = document.querySelector('img[alt="Profile picture"]');

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const userData = await userResponse.json();

    if (profileImg && userData.avatar_url) {
      profileImg.src = userData.avatar_url;
    }
  } catch (error) {
    console.error("GitHub API error:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchData);
