# AGENT.md – Gracewell Technologies 3D Website Hero Section

## Project Objective

Build a premium, cinematic, fully interactive 3D website hero section for **Gracewell Technologies**, inspired by the provided reference image and the immersive office-entry experience of:

- Reference design: Generated Gracewell Technologies office hero image (use the attached image as the primary visual reference).
- Inspiration website: https://www.sebastien-lempens.com/
- Existing company website: https://gracewell.in/

The goal is to recreate the reference image as closely as possible, but as a real-time interactive 3D website rather than a static background image.

**IMPORTANT:** The reference image is the design specification. Do not invent a different layout, change the visual direction, or create a generic technology-company landing page.

---

## 1. Technology Stack

Use the following technologies:

- React.js
- Vite.js
- Three.js
- React Three Fiber
- @react-three/drei
- GSAP
- GSAP ScrollTrigger
- Framer Motion
- JavaScript (ES6+)
- CSS3
- HTML5

Use the existing project structure and installed dependencies wherever possible.

Do not migrate the project to another framework.

---

## 2. Exact Visual Design Requirements

Recreate the reference image with the following visual elements.

### A. Overall Environment

Create a realistic, premium, modern technology-company office entrance.

The scene should contain:

1. A large modern glass entrance with two transparent glass doors.
2. Black metal door frames.
3. Two long vertical metallic door handles.
4. A spacious modern office reception visible through the glass.
5. A polished reflective concrete floor.
6. Warm golden ambient lighting.
7. Circular LED ceiling lights.
8. Modern wooden ceiling panels.
9. Large indoor plants on both sides.
10. A comfortable waiting/lounge area with sofas and a coffee table.
11. A modern reception desk with marble-like material.
12. Gracewell Technologies branding behind the reception desk.
13. Office workstations and monitors visible in the background.
14. Large glass windows with a subtle city skyline outside.
15. A digital blue globe display on the left side of the office.

The environment should feel like a real architectural space, not a cartoon, game environment, or basic 3D model.

### B. Lighting and Materials

Use realistic PBR materials.

- Glass: transparent with subtle reflections.
- Metal: dark brushed metal.
- Floor: polished concrete with reflections.
- Reception desk: premium stone/marble.
- Ceiling: dark wood panels.
- Plants: realistic green foliage.
- Lighting: warm golden-white.
- Exterior: slightly cooler daylight.

Use Three.js lighting strategically:

- Ambient light.
- Directional light.
- Point lights.
- Area-light simulation where appropriate.
- Environment reflections.

Avoid excessive bloom, oversaturated colors, and unrealistic neon effects.

The overall color palette must match the reference:

- Warm black.
- Dark charcoal.
- Golden amber.
- Cream white.
- Natural green.
- Subtle blue.

---

## 3. Header / Navigation

Position the navigation above the 3D scene.

### Left Side

Display the Gracewell Technologies logo.

Use the actual company logo from the existing website or project assets if available.

Brand text:

GRACEWELL
TECHNOLOGIES

### Right Side

Create these navigation links:

- HOME
- ABOUT
- SERVICES
- WORK
- CONTACT

Design requirements:

- White text.
- Uppercase.
- Modern sans-serif typography.
- Proper spacing.
- Minimal hover animation.
- Thin gold underline for the active HOME item.
- Transparent header background.

Keep the header positioned above the 3D scene.

---

## 4. Hero Typography and Content

Position the hero text on the left side of the screen, matching the reference image.

Main heading:

STEP INSIDE.
BUILD WHAT'S NEXT.

Typography:

- Large uppercase font.
- Bold or semibold.
- White text.
- Highlight the word NEXT in warm cream/gold.
- Tight line spacing.
- Premium editorial typography.

Supporting description:

"Digital experiences, intelligent software,
and ideas built to move businesses forward."

CTA button:

"ENTER OUR OFFICE →"

Button styling:

- Transparent background.
- White border.
- Rounded pill shape.
- White uppercase text.
- Subtle hover animation.
- Golden border highlight on hover.

Do not use oversized gradients or colorful backgrounds behind the heading.

---

## 5. Interactive 3D Glass Entrance

This is the most important feature of the hero section.

The entrance must be a real interactive 3D object.

### Initial State

- Both glass doors remain closed.
- Camera faces the office entrance.
- Reception desk is visible inside.
- Door handles are positioned correctly.
- The visitor feels like they are standing outside the office.

### Mouse Interaction

Create a custom hand-shaped cursor when the mouse enters the interactive door area.

Requirements:

- Hide the default cursor only over the interactive entrance.
- Show a custom hand cursor.
- Animate the cursor smoothly using GSAP.
- Add subtle hover feedback to the door handles.
- Show a small circular interaction indicator.

### Click Interaction

When the visitor clicks the entrance or the ENTER OUR OFFICE button:

1. Animate the glass doors opening naturally.
2. Rotate the left and right doors in opposite directions.
3. Use smooth GSAP easing.
4. Animate the camera forward through the entrance.
5. Reveal more of the reception environment.
6. Transition smoothly into the next experience.

The opening animation should feel cinematic and realistic.

Do not simply replace the background image or use a basic fade transition.

---

## 6. Bottom Interaction Instructions

Recreate the reference image's bottom interface.

### Center

Display a minimal mouse icon followed by:

MOVE YOUR CURSOR TO EXPLORE

### Right Side

Display:

SCROLL TO EXPLORE

Add a subtle downward arrow.

Animations:

- Mouse icon scroll-wheel animation.
- Subtle arrow movement.
- Smooth opacity transitions.

Keep these elements near the bottom of the viewport.

---

## 7. Camera and Animation

Use React Three Fiber and GSAP to control the camera.

Initial camera:

- Eye-level perspective.
- Centered on the glass entrance.
- Wide architectural field of view.
- Reception desk visible through the doors.

Animations:

- Initial cinematic camera reveal.
- Subtle camera movement following the mouse.
- Slight parallax movement.
- Door-opening animation.
- Forward camera movement on entrance.
- Smooth transition to the next section.

Avoid excessive camera rotation or shaking.

The initial composition must remain visually close to the reference image.

---

## 8. Three.js Scene Architecture

Build the 3D environment using reusable components.

Suggested structure:

src/
  components/
    layout/
      Header.jsx
      HeroContent.jsx
      HeroFooter.jsx
      CustomCursor.jsx
    three/
      Experience.jsx
      OfficeEnvironment.jsx
      GlassEntrance.jsx
      ReceptionDesk.jsx
      OfficeFurniture.jsx
      OfficePlants.jsx
      CeilingLights.jsx
      DigitalGlobe.jsx
      CameraController.jsx
  sections/
    Hero.jsx
  hooks/
    useDoorAnimation.js
    useCameraAnimation.js
  styles/
    hero.css
    global.css
  App.jsx
  main.jsx

Adapt this structure to the existing project rather than unnecessarily replacing existing files.

Keep the 3D scene separate from the HTML interface.

---

## 9. Asset Requirements

Before creating models:

1. Inspect the existing project assets.
2. Check whether the company logo is already available.
3. Check for existing 3D models and textures.
4. Reuse suitable existing assets.

If 3D models are required, use optimized GLB/GLTF models.

Create or source suitable models for:

- Glass entrance.
- Reception desk.
- Lounge furniture.
- Plants.
- Ceiling lights.
- Office interior.

Use Blender-compatible GLB/GLTF assets.

Do not use a single static office photograph as the final hero background.

The office must be rendered as an actual Three.js scene.

---

## 10. Responsive Design

Desktop:
- Full-screen 3D office environment.
- Reference-matching composition.
- Left-side hero text.
- Top navigation.
- Bottom interaction indicators.

Tablet:
- Maintain the entrance as the main visual.
- Adjust typography and navigation spacing.

Mobile:
- Optimize the 3D environment.
- Reduce expensive effects.
- Reposition hero text.
- Provide touch-friendly entrance interaction.
- Avoid cursor-dependent functionality on touch devices.

Maintain acceptable performance on mobile devices.

---

## 11. Performance Requirements

The website must be optimized.

- Use React Suspense for 3D asset loading.
- Optimize GLB models.
- Compress textures.
- Use appropriate shadow-map resolutions.
- Avoid unnecessary React re-renders.
- Use instancing for repeated objects when appropriate.
- Use efficient lighting.
- Limit expensive post-processing.
- Implement adaptive rendering quality where appropriate.
- Provide a graceful loading screen.

Target smooth 60 FPS on capable desktop hardware.

---

## 12. Strict Design Rules

These requirements are mandatory:

1. Follow the attached reference image as closely as possible.
2. Do not redesign the hero layout.
3. Do not use generic gradients as substitutes for the office environment.
4. Do not use a flat background image instead of the 3D scene.
5. Do not remove the glass entrance.
6. Do not change the warm architectural lighting.
7. Do not change the hero heading or its positioning.
8. Do not add unnecessary cards, badges, or floating UI panels.
9. Do not introduce a sidebar.
10. Do not use cartoon-style 3D models.
11. Do not create placeholder buttons without working interactions.
12. Do not break existing project functionality.
13. Do not modify unrelated website sections.

The final result should resemble the reference image before any interaction takes place.

---

## 13. Development Workflow

Follow these stages in order.

### Stage 1 – Project Inspection
- Inspect the existing Vite project.
- Read package.json.
- Inspect existing components and assets.
- Identify available dependencies.
- Do not overwrite the existing project.

### Stage 2 – 3D Environment
- Build the office entrance.
- Create the reception environment.
- Add furniture, plants, lights, and materials.
- Match the reference composition.

### Stage 3 – HTML Interface
- Add the navigation.
- Add the Gracewell logo.
- Add hero heading and description.
- Add CTA button.
- Add bottom interaction instructions.

### Stage 4 – Animations
- Implement GSAP camera animation.
- Implement interactive glass doors.
- Implement custom hand cursor.
- Add mouse-based parallax.
- Add smooth transitions.

### Stage 5 – Responsive Optimization
- Optimize desktop and mobile layouts.
- Optimize 3D rendering.
- Test interactions.

### Stage 6 – Final Testing
- Run the Vite development server.
- Check browser console errors.
- Fix rendering and animation issues.
- Verify that the hero matches the reference image.

---

## 14. Final Expected Result

The visitor should initially see almost exactly the same composition as the provided Gracewell office reference image.

It should feel like standing outside a premium technology company's glass entrance.

The visitor sees:

- Gracewell Technologies logo at the top left.
- Navigation at the top right.
- Cinematic modern office environment.
- Large glass entrance doors in the foreground.
- Reception desk and company branding inside.
- Large heading on the left.
- ENTER OUR OFFICE button.
- Interactive hand cursor near the door.
- Mouse interaction instructions at the bottom.

When the visitor interacts, the doors open and the camera moves inside the office.

**FINAL PRIORITY: VISUAL ACCURACY FIRST, INTERACTIVITY SECOND, PERFORMANCE THIRD.**

Build the actual working implementation, not just a visual mockup. After completion, report the files created or modified, dependencies added, and any remaining limitations.