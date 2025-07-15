
class FileSystemItem {
  constructor(name) {
    this.name = name;
  }

  display(container, indent = 0) {
    throw new Error("Method 'display()' must be implemented.");
  }

  matches(query) {
    return this.name.toLowerCase().includes(query.toLowerCase());
  }
}

class File extends FileSystemItem {
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  display(container, indent = 0) {
    const fileElement = document.createElement("div");
    fileElement.className = "file";
    fileElement.textContent = `${this.name} (${this.size} KB)`;
    container.appendChild(fileElement);
  }
}

class Folder extends FileSystemItem {
  constructor(name) {
    super(name);
    this.children = [];
    this.expanded = true;
  }

  add(item) {
    this.children.push(item);
  }

  display(container, indent = 0) {
    const folderElement = document.createElement("div");
    folderElement.className = "folder";

    const nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = this.name;
    nameElement.onclick = () => {
      this.expanded = !this.expanded;
      childrenContainer.classList.toggle("hidden", !this.expanded);
    };

    folderElement.appendChild(nameElement);

    const childrenContainer = document.createElement("div");
    childrenContainer.className = this.expanded ? "" : "hidden";

    this.children.forEach(child => child.display(childrenContainer, indent + 2));
    folderElement.appendChild(childrenContainer);
    container.appendChild(folderElement);
  }

  search(query) {
    const matchedChildren = this.children.filter(child => child instanceof Folder ? child.search(query) : child.matches(query));
    return this.matches(query) || matchedChildren.length > 0;
  }

  displayFiltered(container, query, indent = 0) {
    if (!this.search(query)) return;

    const folderElement = document.createElement("div");
    folderElement.className = "folder";

    const nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = this.name;
    nameElement.onclick = () => {
      this.expanded = !this.expanded;
      childrenContainer.classList.toggle("hidden", !this.expanded);
    };

    folderElement.appendChild(nameElement);

    const childrenContainer = document.createElement("div");
    childrenContainer.className = this.expanded ? "" : "hidden";

    this.children.forEach(child => {
      if (child instanceof Folder) {
        child.displayFiltered(childrenContainer, query, indent + 2);
      } else if (child.matches(query)) {
        child.display(childrenContainer, indent + 2);
      }
    });

    folderElement.appendChild(childrenContainer);
    container.appendChild(folderElement);
  }
}

// Build file system
const root = new Folder("root");
const src = new Folder("src");
const assets = new Folder("assets");

const indexFile = new File("index.js", 12);
const styleFile = new File("style.css", 8);
const logoFile = new File("logo.png", 45);

src.add(indexFile);
assets.add(styleFile);
assets.add(logoFile);

root.add(src);
root.add(assets);

// Render file system
const fileSystemContainer = document.getElementById("fileSystem");
function renderFileSystem(query = "") {
  fileSystemContainer.innerHTML = "";
  if (query.trim()) {
    root.displayFiltered(fileSystemContainer, query);
  } else {
    root.display(fileSystemContainer);
  }
}
renderFileSystem();

// Search functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
  renderFileSystem(e.target.value);
});
