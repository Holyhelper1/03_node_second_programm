document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    await remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;

    const currentTitle = document.querySelector(
      `li.list-group[data-id="${id}"]`
    );
    const titleElement = currentTitle.textContent
      .replace("Редактировать", " ")
      .replace("×", " ")
      .trim();
    const title = prompt("Введите новое название", titleElement);

    if (title !== null) {
      await edit(id, title).then(() => {
        const currentTitle = document.querySelector(
          `li.list-group[data-id="${id}"]`
        );
        currentTitle.innerText = title;
      });
    }
  }
});

async function edit(id, newTitle) {
  if (newTitle) {
    try {
      await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ title: newTitle }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finally");
    }
  }
}
