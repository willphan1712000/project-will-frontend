declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  // You can also use this if you want to support CSS Modules (e.g., in a CRA project)
  // const content: { [className: string]: string };
  // export default content;

  // For a simple side-effect import of a global CSS file, the following is enough:
  const content: any; 
  export default content; 
}