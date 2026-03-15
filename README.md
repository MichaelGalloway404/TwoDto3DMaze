# 2D to 3D Maze Renderer

A browser-based maze exploration project that converts a **2D grid map into a pseudo-3D first-person view** using JavaScript and the HTML5 Canvas API.

Originally developed in **Python with Pygame** for a software engineering course and later **rewritten as a web application** using JavaScript, HTML, and CSS.

**Live Demo:**  
https://michaelgalloway404.github.io/TwoDto3DMaze/

---

## Overview

The maze is represented as a **2D matrix** where:

- `1` = wall  
- `0` = walkable floor  

The player navigates the maze while the program dynamically detects nearby walls and overlays **pre-rendered wall sprites** to create the illusion of a **first-person 3D environment**.

The system demonstrates how a 2D grid can be used to simulate 3D perspective without a 3D engine.

---

## Features

- Pseudo-3D first-person maze rendering
- Procedural maze generation
- Real-time minimap with player direction
- Keyboard and on-screen controls
- Sprite sheet rendering system
- HTML5 Canvas based rendering pipeline

---

## Technologies

- **JavaScript (ES6)**
- **HTML5 Canvas API**
- **HTML / CSS**

No external libraries or frameworks are used.

---

## Controls

| Key | Action |
|----|----|
| ↑ Arrow | Move forward |
| ← Arrow | Turn left |
| → Arrow | Turn right |

Touch controls are also available via on-screen buttons.

---

## Author

Michael Galloway
