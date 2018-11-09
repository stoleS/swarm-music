window.addEventListener("mousemove", e => {
  const moveX = (window.innerWidth / 2 - e.pageX) * 0.05;
  const moveY = (window.innerWidth / 2 - e.pageY) * 0.05;
  const bg = document.getElementById("bg");
  bg.style.marginLeft = `${moveX}px`;
  bg.style.marginTop = `${moveY}px`;
});
