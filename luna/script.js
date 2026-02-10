const starsContainer = document.getElementById("stars");

if (starsContainer) {
  const starCount = 90;
  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    const size = Math.random() * 2.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 6}s`;
    star.style.opacity = `${0.4 + Math.random() * 0.6}`;
    starsContainer.appendChild(star);
  }
}
