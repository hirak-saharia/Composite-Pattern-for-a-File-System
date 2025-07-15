# Composite-Pattern-for-a-File-System
A complete UI-based implementation of the Composite Pattern for a File System using HTML, CSS, and JavaScript:

  - Files are leaves — they don’t contain other items.
  - Folders are composites — they can contain files or other folders.
  - The display() method is implemented in both, allowing uniform treatment.


What It Does -

  - Displays a tree-like structure of folders and files.
  - Uses indentation and icons to visually separate folders 📁 and files 📄.
  - Implements the Composite Pattern in JavaScript to treat folders and files uniformly.

<br></br>
  * Base clase: FileSystemItem:
      - a base class for both files and folders
  * Leaf Class: File
      - It inherits from FileSystemItem
  * Composite Class: Folder:
      - Folder is a container that can hold files or other folders
      - It also inherits from FileSystemItem.
      - children is an array that stores its contents
      - add() adds a file/folder and remove() removes one.
      - display() prints the folder name and then calls display() on each child with more indentation.
  * Creating the Structure:
      - create folders: root, src, and assets.
      - create files: index.js, style.css, and logo.png.
  * Building the Tree:

    
      - <img width="740" height="564" alt="image" src="https://github.com/user-attachments/assets/3ac8c671-95f3-40b3-9cdb-43ffab4e1195" />
  * Displaying the Structure:
      - prints the entire file system starting from the root folder.
      - It recursively prints all folders and files with indentation.



      <br></br>
      <img width="463" height="263" alt="image" src="https://github.com/user-attachments/assets/d0af5980-c049-4de5-8916-65a6834ebe04" />


<br></br>
Features - 
  - Expand/Collapse Folders
    - Click on a folder name to toggle its contents.
  - File Size Display
    - Each file shows its size in KB next to its name.
  - Search Functionality
    - A search bar filter folders and files by name in real-time.

<img width="452" height="556" alt="image" src="https://github.com/user-attachments/assets/8e44edd0-5d4b-459d-ac7c-1c38948352f3" />

<br></br>
Upcoming features to be implemented-------
  - drag-and-drop
  - file type icons
  - export to json/xml 
