// ***************************************************
// **** JS code for visualizing Sierpinski Gasket ****
// ***************************************************

// set up svg namespace to dynamically add svg/g to html and append children
const svgns = "http://www.w3.org/2000/svg"

// turn n x 2 array of the form [..., [x, y], ...] to a string of the form "... x,y ..."
function xyArrayToString(points) {
  return points.map(pt => pt.join()).join(" ")
};

// create SVG polygon mark from an n x 2 array of points of the form [..., [x, y], ...]
function createPolygon(points) {
  poly = document.createElementNS(svgns, "polygon")
  poly.setAttribute("points", xyArrayToString(points))
  return poly;
};

function equilateralTriangleAltitude(sideLength) {
  return sideLength / Math.sqrt(2)
};

// create an SVG equilateral triangle from a polygon by specifying the top most vertex
// of the triangle and the side length
function createEquilateralTriangle(vx, vy, sideLength) {
  h = equilateralTriangleAltitude(sideLength)
  v1 = [vx, vy]                        // top vertex         
  v2 = [vx + sideLength / 2.0, vy + h] // bottom right vertex
  v3 = [vx - sideLength / 2.0, vy + h] // bottom left vertex
  return createPolygon([v1, v2, v3]);
};

function subdivideEquilateralTriangle(vx, vy, sideLength) {
  h = equilateralTriangleAltitude(sideLength)
  t1 = [vx, vy, sideLength / 2.0]
  t2 = [vx - sideLength / 4.0, vy + h / 2.0, sideLength / 2.0]
  t3 = [vx + sideLength / 4.0, vy + h / 2.0, sideLength / 2.0]
  return [t1, t2, t3]
};

function subdivideEquilateralTriangles(triangles) {
  var subdividedTriangles = []
  for (t of triangles) {
    subdividedTriangles = subdividedTriangles.concat(subdivideEquilateralTriangle(...t))
  }
  return subdividedTriangles;
};

function iterativeSierpinski(n, x, y, sideLength) {
  var prev_iter = [],
    curr_iter = []
  for (let i = 0; i < n; i++) {
    if (i == 0) {
     curr_iter = [[x, y, sideLength]] 
    }
    else {
      prev_iter = curr_iter
      curr_iter = subdivideEquilateralTriangles(prev_iter)
    }
  }
  return curr_iter;
};

// draw an equilateral triangle by appending to parent element
function drawSierpinski(parent, triangles) {
  for (t of triangles) {
    mark = createEquilateralTriangle(...t)
    mark.setAttribute("class", "triangle") // to inherit css styles
    parent.append(mark)
  }
};