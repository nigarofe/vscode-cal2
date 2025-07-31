Express your knowledge of line integrals by providing its essential formulas using symbolic notation and describing each formula in plain language. The answer should include the following topics:
 - Pythagoras's Theorem in 2 and 3 dimensions
 - Arc length of a curve
 - Line integral of a scalar field
 - Line integral of a vector field
 - Line integral of a **conservative** vector field in 2D


## Pythagoras's Theorem
**2D Space**: Suppose you have two points, A and B, on a 2D plane. Let **dx** be the difference in their x-coordinates and **dy** be the difference in their y-coordinates. The straight-line distance **D** between these points is given by: 
$$D = \sqrt{(dx)^2 + (dy)^2}$$

**3D Space**: When we move to three dimensions, we add a third component. Let **dz** be the difference in their z-coordinates. Now, the distance between the two points becomes:
$$D = \sqrt{(dx)^2 + (dy)^2 + (dz)^2}$$
## Arc length of a curve
$$\boxed{\;L \;=\;\displaystyle\int_C ds \;=\;\int_{t=a}^{t=b} \bigl\lVert \mathbf r'(t) \bigr\rVert\,dt\;}$$
$$ r(t)=\langle x(t),y(t),z(t)\rangle\ for (t\in[a,b]) $$
$$ds = \|\mathbf{r}'(t)\|\, dt$$
$$ \mathbf r'(t)=\bigl\langle x'(t),\,y'(t),\,z'(t)\bigr\rangle.$$
$$\|\mathbf{r}'(t)\| = \sqrt{ \left( \frac{dx(t)}{dt} \right)^2 + \left( \frac{dy(t)}{dt} \right)^2 + \left( \frac{dz(t)}{dt} \right)^2 }.$$
## Line integral of a scalar field
$$\int_C f(x, y, z)\, ds = \int_{t=a}^{t=b} f(x(t), y(t), z(t)) \|\mathbf{r}'(t)\|\, dt \\ $$
where f(x,y,z) can be interpreted as the density of a wire in the position x,y,z.
## Line integral of a vector field
$$\boxed{\;
\int_{C}\mathbf F\cdot d\mathbf r
=\int_{C} P\,dx+Q\,dy+R\,dz
=\int_{t=a}^{t=b}\mathbf F\bigl(\mathbf r(t)\bigr)\,\cdot\,\mathbf r'(t)\,dt
\;}$$
$$ \mathbf F=\mathbf F(x,y,z)=\langle P(x,y,z),\;Q(x,y,z),\;R(x,y,z)\rangle, $$
$$\mathbf F\bigl(\mathbf r(t)\bigr) =\mathbf F(x(t),y(t),z(t))=\langle P(x(t),y(t),z(t)),\;Q(x(t),y(t),z(t)),\;R(x(t),y(t),z(t))\rangle, $$
$$
\mathbf F\bigl(\mathbf r(t)\bigr)\,\cdot\,\mathbf r'(t)\,dt = \mathbf F\bigl(\mathbf r(t)\bigr)\, \cdot \, \left(\frac{dx(t)}{dt}\,,\frac{dy(t)}{dt}\,,\frac{dz(t)}{dt}\right)
$$
$$
\int_{t=a}^{t=b}\mathbf F\bigl(\mathbf r(t)\bigr)\,\cdot\,\mathbf r'(t)\,dt =
\int_{t=a}^{t=b} P\,\frac{dx(t)}{dt}\,dt+Q\,\frac{dy(t)}{dt}\,dt+R\,\frac{dz(t)}{dt}\,dt
$$


[[q16]]
## Line integral of a **conservative** vector field in 2D
A vector field is conservative when the net work done over any closed loop is zero. That means—ignoring any other losses—if you start with some kinetic energy (i.e. speed) and let only the conservative field and your perfectly efficient regen‑brakes act, you’ll end up with exactly the same kinetic energy you began with, no matter what loop you take.
$$\oint_C \mathbf F\!\cdot\!d\mathbf r \;=\; 0$$

For a planar curve $C$ in $\mathbb R^{2}$ with $F(x,y)=\langle P(x,y),Q(x,y)\rangle$ and $r(t)=\langle x(t),y(t)\rangle$
$$
\int_{C}\mathbf F\cdot d\mathbf r
=\int_{C} P\,dx+Q\,dy
=\int_{t=a}^{t=b}\!\bigl[P(x(t),y(t))\,x'(t)+Q(x(t),y(t))\,y'(t)\bigr]\,dt. $$
To check if the field is conservative
$$
\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}
$$
When the field is conservative, there exists a potential function f(x,y) such that 
$$ F(x,y) = \nabla f $$
$$ \langle P(x,y),Q(x,y)\rangle = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle$$
$$ \frac{\partial f}{\partial x} = P(x, y), \quad \frac{\partial f}{\partial y} = Q(x, y) $$
$$ \int_{t=a}^{t=b}\!\bigl[P(x(t),y(t))\,x'(t)+Q(x(t),y(t))\,y'(t)\bigr]\,dt = f(b) - f(a) $$

