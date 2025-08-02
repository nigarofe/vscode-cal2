









# Premise Set 1

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


[](Questions.md#question-16)


## Line integral of a **conservative** vector field in 2D

A vector field is conservative when the net work done over any closed loop is zero. That means"”ignoring any other losses"”if you start with some kinetic energy (i.e. speed) and let only the conservative field and your perfectly efficient regen"‘brakes act, you'll end up with exactly the same kinetic energy you began with, no matter what loop you take.
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










# Premise Set 2




$$\int_C f \, ds = \int_{t=a}^{t=b} f(\vec{r}(t)) \|\vec{r}'(t)\| \, dt$$

$$\int_C \vec{F} \cdot d\vec{r} = \int_{t=a}^{t=b} \vec{F}(\vec{r}(t)) \cdot \vec{r}'(t) \, dt$$

$$\iint_S f \, dS = \iint_D f(\vec{r}(u,v)) \|\vec{r}_u \times \vec{r}_v\| \, dA_{(du,dv)}$$

$$\iint_S \vec{F} \cdot d\vec{S} = \iint_D \vec{F}(\vec{r}(u,v)) \cdot (\vec{r}_u \times \vec{r}_v) \, dA_{(du,dv)}$$


Caso Específico (para uma superfície $z = g(x, y)$ sobre uma região $D$ com orientação para cima):
$$\iint_S f(x, y, z) \, dS = \iint_D f(x, y, g(x, y)) \sqrt{\left(\frac{\partial g}{\partial x}\right)^2 + \left(\frac{\partial g}{\partial y}\right)^2 + 1} \, dA_{(dx,dy)}$$
$$\iint_S \vec{F} \cdot d\vec{S} = \iint_D \vec{F}(x, y, g(x, y)) \cdot \left(-\frac{\partial g}{\partial x}, -\frac{\partial g}{\partial y}, 1\right) \, dA_{(dx,dy)}$$



o elemento de área dA no domínio dos parâmetros u e v










# Premise Set 3

1. Equilíbrio de momentos em um elemento infinitesimal

Considere um cubo infinitesimal de material sujeito ao estado de tensões

$$
\sigma_{ij} = \begin{bmatrix}
\sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\
\sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\
\sigma_{zx} & \sigma_{zy} & \sigma_{zz}
\end{bmatrix}.
$$

- Condição de não rotação (equilíbrio estático)

Para que o cubo não gire, a soma dos momentos (torques) produzidos pelas tensões em cada eixo deve ser nula:

$$
\sum M_x = 0, \quad \sum M_y = 0, \quad \sum M_z = 0.
$$

- Exemplo em torno do eixo $z$

Tomando momentos sobre o eixo $z$ pela distribuição das tensões de cisalhamento nas faces normais a $x$ e $y$ (área $A$ e braço $h/2$), obtém-se

$$
\tau_{xy}\,A\frac{h}{2} \;-\; \tau_{yx}\,A\frac{h}{2} = 0
\quad\Longrightarrow\quad
\tau_{xy} = \tau_{yx}.
$$

- Generalização

Repetindo o balanço para os eixos $y$ e $x$, conclui-se que

$$
\tau_{xz} = \tau_{zx}, \quad \tau_{yz} = \tau_{zy}.
$$

- Resultado chave "” simetria do tensor de tensões

Em equilíbrio estático o tensor de tensões é simétrico:

$$
\sigma_{ij} = \sigma_{ji}.
$$

Essa simetria reduz de 9 para 6 o número de componentes independentes do tensor de tensões, simplificando significativamente as análises em Mecânica dos Sólidos.










# Premise Set 4


## Calculating stress tensor rotation
- [[r2 Video MACETE - MultiplicacÌ§aÌƒo de matrizes]]
- matrixcalc.org/pt/


## Calculating  $\sigma'$


### Definitions
$$\sigma' =
\begin{bmatrix}
\sigma'_{xx} & \sigma'_{xy} & \sigma'_{xz} \\
\sigma'_{yx} & \sigma'_{yy} & \sigma'_{yz} \\
\sigma'_{zx} & \sigma'_{zy} & \sigma'_{zz}
\end{bmatrix}= L \sigma L^T$$
$$
L =
\begin{bmatrix}
L_{xx} & L_{xy} & L_{xz} \\
L_{yx} & L_{yy} & L_{yz} \\
L_{zx} & L_{zy} & L_{zz}
\end{bmatrix}
$$

$$
\sigma =
\begin{bmatrix}
\sigma_{xx} & \tau_{xy} & \tau_{xz} \\
\tau_{yx} & \sigma_{yy} & \tau_{yz} \\
\tau_{zx} & \tau_{zy} & \sigma_{zz}
\end{bmatrix}
$$

$$L^T =
\begin{bmatrix}
L_{xx} & L_{yx} & L_{zx} \\
L_{xy} & L_{yy} & L_{zy} \\
L_{xz} & L_{yz} & L_{zz}
\end{bmatrix}$$

$$L \sigma =
\begin{bmatrix}
(L \sigma)_{xx} & (L \sigma)_{xy} & (L \sigma)_{xz} \\
(L \sigma)_{yx} & (L \sigma)_{yy} & (L \sigma)_{yz} \\
(L \sigma)_{zx} & (L \sigma)_{zy} & (L \sigma)_{zz}
\end{bmatrix}
$$


### Calculating $L \sigma$

To calculate $\sigma'$, we can first calculate only the products of the two first matrixes

$$
(L\sigma)_{xx} = L_{xx} \sigma_{xx} + L_{xy} \sigma_{yx} + L_{xz} \sigma_{zx},
$$
$$
(L\sigma)_{xy} = L_{xx} \sigma_{xy} + L_{xy} \sigma_{yy} + L_{xz} \sigma_{zy},
$$
$$
(L\sigma)_{xz} = L_{xx} \sigma_{xz} + L_{xy} \sigma_{yz} + L_{xz} \sigma_{zz},
$$
$$
(L\sigma)_{yx} = L_{yx} \sigma_{xx} + L_{yy} \sigma_{yx} + L_{yz} \sigma_{zx},
$$
$$
(L\sigma)_{yy} = L_{yx} \sigma_{xy} + L_{yy} \sigma_{yy} + L_{yz} \sigma_{zy},
$$
$$
(L\sigma)_{yz} = L_{yx} \sigma_{xz} + L_{yy} \sigma_{yz} + L_{yz} \sigma_{zz},
$$
$$
(L\sigma)_{zx} = L_{zx} \sigma_{xx} + L_{zy} \sigma_{yx} + L_{zz} \sigma_{zx},
$$
$$
(L\sigma)_{zy} = L_{zx} \sigma_{xy} + L_{zy} \sigma_{yy} + L_{zz} \sigma_{zy},
$$
$$
(L\sigma)_{zz} = L_{zx} \sigma_{xz} + L_{zy} \sigma_{yz} + L_{zz} \sigma_{zz}.
$$


### Calculating $(L \sigma) L^T$

$$
\sigma'_{xx} = (L\sigma)_{xx} L_{xx} + (L\sigma)_{xy} L_{xy} + (L\sigma)_{xz} L_{xz},
$$
$$
\sigma'_{xy} = (L\sigma)_{xx} L_{yx} + (L\sigma)_{xy} L_{yy} + (L\sigma)_{xz} L_{yz},
$$
$$
\sigma'_{xz} = (L\sigma)_{xx} L_{zx} + (L\sigma)_{xy} L_{zy} + (L\sigma)_{xz} L_{zz},
$$
$$
\sigma'_{yx} = (L\sigma)_{yx} L_{xx} + (L\sigma)_{yy} L_{xy} + (L\sigma)_{yz} L_{xz},
$$
$$
\sigma'_{yy} = (L\sigma)_{yx} L_{yx} + (L\sigma)_{yy} L_{yy} + (L\sigma)_{yz} L_{yz},
$$
$$
\sigma'_{yz} = (L\sigma)_{yx} L_{zx} + (L\sigma)_{yy} L_{zy} + (L\sigma)_{yz} L_{zz},
$$
$$
\sigma'_{zx} = (L\sigma)_{zx} L_{xx} + (L\sigma)_{zy} L_{xy} + (L\sigma)_{zz} L_{xz},
$$
$$
\sigma'_{zy} = (L\sigma)_{zx} L_{yx} + (L\sigma)_{zy} L_{yy} + (L\sigma)_{zz} L_{yz},
$$
$$
\sigma'_{zz} = (L\sigma)_{zx} L_{zx} + (L\sigma)_{zy} L_{zy} + (L\sigma)_{zz} L_{zz}.
$$


### Example with rotation about the Y axis by $\theta°$

$$
L =
\begin{bmatrix}
L_{xx} & L_{xy} & L_{xz} \\
L_{yx} & L_{yy} & L_{yz} \\
L_{zx} & L_{zy} & L_{zz}
\end{bmatrix} =
\begin{bmatrix}
c & 0 & s \\
0 & 1 & 0 \\
-s & 0 & c
\end{bmatrix}
$$
$$
L^T =
\begin{bmatrix}
L_{xx} & L_{yx} & L_{zx} \\
L_{xy} & L_{yy} & L_{zy} \\
L_{xz} & L_{yz} & L_{zz}
\end{bmatrix} =
\begin{bmatrix}
c & 0 & -s \\
0 & 1 & 0 \\
s & 0 & c
\end{bmatrix}
$$


### Calculate $L \sigma$
$$
\begin{bmatrix}
\sigma_{xx} & \tau_{xy} & \tau_{xz} \\
\tau_{yx} & \sigma_{yy} & \tau_{yz} \\
\tau_{zx} & \tau_{zy} & \sigma_{zz}
\end{bmatrix}
$$
$$
\begin{bmatrix}
c & 0 & s \\
0 & 1 & 0 \\
-s & 0 & c
\end{bmatrix}
\quad
\begin{bmatrix}
c\,\sigma_{xx} + 0\,\tau_{yx} + s\,\tau_{zx}
& c\,\tau_{xy} + 0\,\sigma_{yy} + s\,\tau_{zy}
& c\,\tau_{xz} + 0\,\tau_{yz} + s\,\sigma_{zz} \\[6pt]
0\,\sigma_{xx} + 1\,\tau_{yx} + 0\,\tau_{zx}
& 0\,\tau_{xy} + 1\,\sigma_{yy} + 0\,\tau_{zy}
& 0\,\tau_{xz} + 1\,\tau_{yz} + 0\,\sigma_{zz} \\[6pt]
 -s\,\sigma_{xx} + 0\,\tau_{yx} + c\,\tau_{zx}
& -s\,\tau_{xy} + 0\,\sigma_{yy} + c\,\tau_{zy}
& -s\,\tau_{xz} + 0\,\tau_{yz} + c\,\sigma_{zz}
\end{bmatrix}.
$$
$$c = \cos(\theta) \quad \text{and} \quad s = \sin(\theta)$$


### Calculate $\sigma' = (L \sigma) L^T$

$$
\sigma'_{xx} = c(c\,\sigma_{xx} + 0\,\tau_{yx} + s\,\tau_{zx}) \;+\; 0(c\,\tau_{xy} + 0\,\sigma_{yy} + s\,\tau_{zy}) \;+\; s(c\,\tau_{xz} + 0\,\tau_{yz} + s\,\sigma_{zz})
$$
$$\sigma'_{xx} =c^2\,\sigma_{xx} \;+\; c\,s\,\tau_{zx} \;+\; c\,s\,\tau_{xz} \;+\; s^2\,\sigma_{zz}$$
$$\sigma'_{xx} =c^2\,\sigma_{xx} \;+\; 2\, c\,s\,\tau_{xz} \;+\; s^2\,\sigma_{zz}$$
Using
$$
\cos^2 \theta = \frac{1 + \cos 2\theta}{2}, \quad \sin^2 \theta = \frac{1 - \cos 2\theta}{2}, \quad 2 \sin \theta \cos \theta = \sin 2\theta,
$$
we start from
$$
\sigma'_{xx} = c^2 \sigma_{xx} + 2 c s \tau_{xz} + s^2 \sigma_{zz}.
$$
Substitute:
$$
c^2 = \frac{1 + \cos 2\theta}{2}, \quad s^2 = \frac{1 - \cos 2\theta}{2}, \quad 2 c s = \sin 2\theta.
$$
Then
$$
\sigma'_{xx} = \sigma_{xx} \frac{1 + \cos 2\theta}{2} + \tau_{xz} \sin 2\theta + \sigma_{zz} \frac{1 - \cos 2\theta}{2}.
$$
Combine terms:
$$
\sigma'_{xx} = \frac{\sigma_{xx} + \sigma_{zz}}{2} + \frac{\sigma_{xx} - \sigma_{zz}}{2} \cos 2\theta + \tau_{xz} \sin 2\theta.
$$


## Where does $[L]$ come from in a numerical example

![[ps18#$ cos(A pm B)$]]


Rotation of 30° CCW in Z axis
![[ps4.png|300]]
1. Faça um esboço apenas do sistema original, indicando:
	- os eixos $x$, $y$ e $z$;
2. No mesmo esboço, acrescente:
	- o sistema rotacionado $(x', y', z')$;
	-  os 9 ângulos ângulos entre os eixos rotação entre os dois sistemas.


- $\theta_{ij} =$ Qual é o ângulo entre o eixo $i$ e o eixo $j$

$$[L] = \begin{bmatrix}
\cos \theta_{xx'} & \cos \theta_{xy'} & \cos \theta_{xz'} \\
\cos \theta_{yx'} & \cos \theta_{yy'} & \cos \theta_{yz'} \\
\cos \theta_{zx'} & \cos \theta_{zy'} & \cos \theta_{zz'}
\end{bmatrix}$$
$$= \begin{bmatrix}
\cos 30^\circ & \cos 120^\circ & \cos 90^\circ \\
\cos -60^\circ & \cos 30^\circ & \cos 90^\circ \\
\cos 90^\circ & \cos 90^\circ & \cos 0^\circ
\end{bmatrix}$$
$$= \begin{bmatrix}
\cos 30^\circ & \cos 30^\circ+90^\circ & \cos 90^\circ \\
\cos 30^\circ-90^\circ & \cos 30^\circ & \cos 90^\circ \\
\cos 90^\circ & \cos 90^\circ & \cos 0^\circ
\end{bmatrix}$$
$$= \begin{bmatrix}
\cos 30^\circ & -\sin 30^\circ & \cos 90^\circ \\
\sin 30^\circ & \cos 30^\circ & \cos 90^\circ \\
\cos 90^\circ & \cos 90^\circ & \cos 0^\circ
\end{bmatrix}$$
$$= \begin{bmatrix}
\cos 30^\circ & -\sin 30^\circ & 0 \\
\sin 30^\circ & \cos 30^\circ & 0 \\
0 & 0 & 1
\end{bmatrix}$$
$$= \begin{bmatrix}
\sqrt{3}/2 & -1/2 & 0 \\
1/2 & \sqrt{3}/2 & 0 \\
0 & 0 & 1
\end{bmatrix}$$


## Numerical example

[[q88]]



$$
\begin{array}{cc}
\quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad
&
\begin{bmatrix}
100 & 0 & 120 \\
0 & 20 & 0 \\
120 & 0 & 80
\end{bmatrix}
&
\quad
\begin{bmatrix}
\cos 30^\circ & 0 & -\sin 30^\circ \\
0 & 1 & 0 \\
\sin 30^\circ & 0 & \cos 30^\circ
\end{bmatrix}
\end{array}
$$

$$
\begin{array}{ccc}
\begin{bmatrix}
\cos 30^\circ & 0 & \sin 30^\circ \\
0 & 1 & 0 \\
-\sin 30^\circ & 0 & \cos 30^\circ
\end{bmatrix}
&
\begin{bmatrix}
46,60 & 0 & 143,92 \\
0 & 20 & 0 \\
53,92 & 0 & 9,28
\end{bmatrix}
&
\begin{bmatrix}
198,92 & 0 & 51,34 \\
0 & 20 & 0 \\
51,34 & 0 & -18,92
\end{bmatrix}
\end{array}
$$


## Questions to be answered

- Regardless of orientation, what quantities remain constant on a Cauchy stress tensor on an infinitesimal element, common "orientation"independent" measures.










# Premise Set 5


## Tensor Tensão vs Tensor Deformação


### Introdução

- A unidade do tensor tensão é $MPa$, enquanto o tensor deformação é adimensional. Isso porque o tensor deformação mede a deformação que um elemento infinitesimal de um corpo sofre. A medição de deformação pode ser pensada da seguinte forma: vamos supor que se eu aplicar uma força $F$ em uma barra que tem $0,5\,m$ de comprimento, ela vai sofrer um alongamento medido de $0,002\,m = 2\,mm$.
- Ou seja, a deformação da barra é:
$$
\varepsilon = \frac{\Delta L}{L_0} = \frac{0,002\,m}{0,5\,m} = 0,004.
$$
Como $0,004$ é apenas uma razão, não há unidade associada a $\varepsilon$.

- $\textbf{Tensor de tensão}$ tem unidade de pressão (por exemplo MPa), porque ele mede forças internas por área.
- $\textbf{Tensor de deformação}$ é adimensional, pois descreve a variação relativa de comprimento (ou ângulo) de um elemento infinitesimal do corpo. Em outras palavras, é a razão entre o deslocamento e a dimensão original, sem unidades.
-


### Tensor de tensões

$$
\text{Tensor de tensões } (\sigma)  =
\begin{bmatrix}
\sigma_{xx} & \tau_{xy} & \tau_{xz} \\
\tau_{yx} & \sigma_{yy} & \tau_{yz} \\
\tau_{zx} & \tau_{zy} & \sigma_{zz}
\end{bmatrix}
$$

Definições e observações:
1. Componentes de tensão normal
- $\sigma_{xx}$, $\sigma_{yy}$, $\sigma_{zz}$ são as tensões normais (tração ou compressão).
- Cada $\sigma_{ii}$ atua na face do elemento cuja superfície é perpendicular ao eixo $i$ (isto é, $\sigma_{xx}$ age na face ortogonal ao eixo $x$, $\sigma_{yy}$ age na face ortogonal ao eixo $y$, etc.), e a direção da força é paralelo ao próprio eixo $i$.

2. Componentes de tensão de cisalhamento
- $\tau_{ij}$ (com $i \neq j$) é a tensão de cisalhamento que atua na face perpendicular ao eixo $i$, com direção paralela ao eixo $j$.
- Por exemplo, $\tau_{xy}$ é a tensão de cisalhamento na face ortogonal ao eixo $x$, mas apontando na direção $y$. De modo equivalente, $\tau_{yx}$ atua na face ortogonal ao eixo $y$, apontando na direção $x$.
- Em meios contínuos sem momento externo distribuído (hipótese de ausência de corpos-de-forma), o tensor de tensões é simétrico, isto é,
$$
\tau_{xy} = \tau_{yx}, \quad \tau_{xz} = \tau_{zx}, \quad \tau_{yz} = \tau_{zy}.
$$

3. Visualização intuitiva
- Tensões normais ($\sigma_{ii}$) podem ser imaginadas como setas saindo (ou entrando, em compressão) normalmente Ã s faces do elemento.
- Tensões de cisalhamento ($\tau_{ij}$) podem ser imaginadas como setas "coladas" Ã  face do elemento, apontando paralelamente ao eixo $j$ sobre a face perpendicular ao eixo $i$.

Em outras palavras, cada subíndice na notação $\tau_{ij}$ indica primeiro a face sobre a qual a força é aplicada (o índice $i$, que determina qual face é "perpendicular" ao eixo $i$) e depois a direção da força (o índice $j$, que diz em que direção, entre $x$, $y$, $z$, a tensão está atuando).


### Tensor de deformações

$$
\text{Tensor de deformações } (\varepsilon) =
\begin{bmatrix}
\varepsilon_{xx} & \frac{\gamma_{xy}}{2} & \frac{\gamma_{xz}}{2} \\
\frac{\gamma_{xy}}{2} & \varepsilon_{yy} & \frac{\gamma_{yz}}{2} \\
\frac{\gamma_{xz}}{2} & \frac{\gamma_{yz}}{2} & \varepsilon_{zz}
\end{bmatrix}
$$
$$
\varepsilon_{ij} = \frac{\gamma_{ij}}{2} \quad (i \neq j) \quad \implies \quad \gamma_{ij} = 2\,\varepsilon_{ij}
$$
$$
\varepsilon_{ij} = \tfrac{1}{2}\Bigl(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\Bigr) \quad (i \neq j).
$$



1. Componentes de deformação normal

- $\varepsilon_{xx}, \varepsilon_{yy}, \varepsilon_{zz}$ são as deformações normais (alongamento ou encurtamento).
- Cada $\varepsilon_{ii}$ mede a variação relativa de comprimento de uma fibra originalmente paralela ao eixo $i$:
$$
\varepsilon_{xx} = \frac{\partial u_x}{\partial x}, \quad
\varepsilon_{yy} = \frac{\partial u_y}{\partial y}, \quad
\varepsilon_{zz} = \frac{\partial u_z}{\partial z},
$$
onde $\mathbf{u} = (u_x, u_y, u_z)$ é o vetor deslocamento.
- Valor positivo $\to$ alongamento; negativo $\to$ encurtamento (compressão).

2. Componentes de deformação de cisalhamento

- Para $i \neq j$, as componentes $\varepsilon_{ij}$ representam a distorção angular entre direções originalmente ortogonais $i$ e $j$.
- Na prática de engenharia usa-se a deformação de cisalhamento "engenharia"
$$
\gamma_{ij} = 2\varepsilon_{ij}, \quad (i \neq j),
$$
porque $\gamma_{ij}$ corresponde diretamente Ã  variação do ângulo reto (em radianos) entre os eixos $i$ e $j$.
- Exemplo: $\gamma_{xy}$ é a variação do ângulo entre linhas inicialmente paralelas aos eixos $x$ e $y$.
- Como o tensor de deformações é obtido pela média simétrica do gradiente de deslocamentos, ele é necessariamente simétrico:
$$
\varepsilon_{xy} = \varepsilon_{yx}, \quad
\varepsilon_{xz} = \varepsilon_{zx}, \quad
\varepsilon_{yz} = \varepsilon_{zy}.
$$

3. Visualização intuitiva

- Deformações normais ($\varepsilon_{ii}$): imagine uma aresta de um cubo elemento ao longo do eixo $i$ que se alonga ou encurta "” seu comprimento final é $(1 + \varepsilon_{ii})$ vezes o original (para pequenas deformações).
- Deformações de cisalhamento ($\gamma_{ij}$): visualize um quadrado inicialmente com 90° entre $x$ e $y$ tornando-se um paralelogramo; o "deslizamento" das camadas paralelas ao eixo $j$ sobre a face perpendicular ao eixo $i$ altera o ângulo em $\gamma_{ij}$ (positiva se o ângulo diminui).
- As setas usadas para tensões podem ser reutilizadas aqui como deslocamentos relativos: ao invés de representar forças, elas mostram o quanto um ponto da face move-se paralelamente Ã quela face.

4. Relação completa com o gradiente de deslocamentos (regime de pequenas deformações)

$$
\varepsilon_{ij} = \tfrac{1}{2}\Bigl(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\Bigr) \quad (i, j = x, y, z).
$$

Esta fórmula reúne, em um único objeto simétrico, todas as deformações normais e de cisalhamento, servindo de base para relações constitutivas (Lei de Hooke, por exemplo) e para o cálculo de deformações a partir de campos de deslocamentos experimentais ou numéricos.


### Alfabeto grego utilizado










# Premise Set 6


## Conjunto de Premissas

- [[ps32]]


## Nome das variáveis, tensores e matrizes mais utilizados em Mecânica dos sólidos

| Nome utilizado                           | Símbolo       | Nome do símbolo                             |
| ---------------------------------------- | ------------- | ------------------------------------------- |
| Tensão normal                            | $\sigma$      | sigma (ÏƒÎ¯Î³Î¼Î±)                               |
| Tensão de cisalhamento                   | $\tau$        | tau (Ï„Î±Ï…)                                   |
| Deformação normal                        | $\varepsilon$ | epsilon (Î­ÏˆÎ¹Î»Î¿Î½)                            |
| Deformação de cisalhamento               | $\gamma$      | gamma (Î³Î¬Î¼Î¼Î±)                               |
| Coeficiente de Poisson                   | $\nu$         | nu (Î½Ï…)                                     |
| Módulo de cisalhamento                   | $\mu$         | mu (Î¼Ï…)                                     |
| Parâmetro de Lamé                        | $\lambda$     | lambda (Î»Î¬Î¼Î²Î´Î±)                             |
| Densidade                                | $\rho$        | rho (ÏÏŽ)                                    |
| Delta de Kronecker                       | $\delta_{ij}$ | delta (Î´Î­Î»Ï„Î±)                               |
| Coeficiente de dilatação térmica         | $\alpha$      | alpha (Î¬Î»Ï†Î±)                                |
| Ã‚ngulo                                   | $\theta$      | theta (Î¸Î®Ï„Î±)                                |
| Módulo de elasticidade (módulo de Young) | $E$           | "“ (letra latina "E", sem equivalente grego) |
|                                          |               |                                             |
$$
\text{Tensor de tensões } [\sigma]  =
\begin{bmatrix}
\sigma_{xx} & \tau_{xy} & \tau_{xz} \\
\tau_{yx} & \sigma_{yy} & \tau_{yz} \\
\tau_{zx} & \tau_{zy} & \sigma_{zz}
\end{bmatrix}
$$
Seguindo a convenção de sinais mais comum em Mecânica dos Sólidos "”"¯isto é,
_normal_ positiva quando o vetor"‘tração aponta para fora da face positiva do eixo,
e _cisalhante_ positiva quando, na face positiva **i**, o vetor está na direção positiva **j**

Em mecânica dos sólidos é hábito distinguir na escrita os $\textbf{esforços normais}$ (que atuam $\textbf{perpendicularmente}$ Ã  face) dos $\textbf{esforços de cisalhamento}$ (que atuam $\textbf{tangencialmente}$ Ã  face), usando:
- $\sigma$ (sigma) para os normais
- $\tau$ (tau) para os cisalhantes

---
$$ \text{Matriz de Tensões Principais }[\sigma_p] = \begin{bmatrix} \sigma_1 & 0 & 0 \\ 0 & \sigma_2 & 0 \\ 0 & 0 & \sigma_3 \end{bmatrix} $$
$$ \text{Matriz de Autovalores }[D] = [\lambda I]=  \begin{bmatrix} \lambda_1 & 0 & \cdots \\ 0 & \lambda_2 & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix} $$
$$ \text{Matriz de Autovetores } [P] = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix} $$
Onde cada $v_i$ é um vetor coluna.

>[!tip] Termos de engenharia e Termos de matemática
>- Tensão principal = Autovalor
>- Matriz de tensões principais = Matriz de Autovalores
>- Cosseno diretor = Autovetor normalizado = Vetor unitário normal (ao plano)
>


---
$$
\text{Tensor de deformações } [\varepsilon]) =
\begin{bmatrix}
\varepsilon_{xx} & \varepsilon_{xy} & \varepsilon_{xz} \\
\varepsilon_{yx} & \varepsilon_{yy} & \varepsilon_{yz} \\
\varepsilon_{zx} & \varepsilon_{zy} & \varepsilon_{zz} \\
\end{bmatrix}
=
\begin{bmatrix}
\varepsilon_{xx} & \frac{\gamma_{xy}}{2} & \frac{\gamma_{xz}}{2} \\
\frac{\gamma_{xy}}{2} & \varepsilon_{yy} & \frac{\gamma_{yz}}{2} \\
\frac{\gamma_{xz}}{2} & \frac{\gamma_{yz}}{2} & \varepsilon_{zz}
\end{bmatrix}
$$
$$\varepsilon_{xy} = \text{ Componente do tensor de deformações / Deformação tensorial}$$
$$\gamma_{xy} = \text{ Deformação de engenharia de cisalhamento}$$


$$
\varepsilon_{ij} = \frac{\gamma_{ij}}{2} \quad (i \neq j) \quad \implies \quad \gamma_{ij} = 2\,\varepsilon_{ij}
$$
$$
\varepsilon_{ij} = \tfrac{1}{2}\Bigl(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\Bigr) \quad (i \neq j).
$$

---

![[ps32#[Matriz identidade](https //en.wikipedia.org/wiki/Identity_matrix) e [Delta de Kronecker](https //en.wikipedia.org/wiki/Kronecker_delta)]]


---
$$
\text{Matriz de rigidez / elasticidade } [\mathbf{C}] =
\begin{pmatrix}
\lambda + 2\mu & \lambda & \lambda & 0 & 0 & 0 \\
\lambda & \lambda + 2\mu & \lambda & 0 & 0 & 0 \\
\lambda & \lambda & \lambda + 2\mu & 0 & 0 & 0 \\
0 & 0 & 0 & \mu & 0 & 0 \\
0 & 0 & 0 & 0 & \mu & 0 \\
0 & 0 & 0 & 0 & 0 & \mu
\end{pmatrix}.
$$
---
$$
\text{Matriz de conformidade / compliância } [\mathbf{S}] =
\begin{pmatrix}
\frac{1}{E} & -\frac{\nu}{E} & -\frac{\nu}{E} & 0 & 0 & 0 \\
-\frac{\nu}{E} & \frac{1}{E} & -\frac{\nu}{E} & 0 & 0 & 0 \\
-\frac{\nu}{E} & -\frac{\nu}{E} & \frac{1}{E} & 0 & 0 & 0 \\
0 & 0 & 0 & \frac{1}{\mu} & 0 & 0 \\
0 & 0 & 0 & 0 & \frac{1}{\mu} & 0 \\
0 & 0 & 0 & 0 & 0 & \frac{1}{\mu}
\end{pmatrix}.
$$
A matriz $S$ satisfaz $[S] = [C]^{-1},$ de modo que $\{\varepsilon\} = [S]\{\sigma\}$

---










# Premise Set 7


## Equações Constitutivas da Elasticidade Linear Isotrópica

Este é o nome mais formal e completo. "Constitutiva" porque descreve a constituição (o comportamento intrínseco) do material. "Elasticidade Linear" porque a relação entre tensão e deformação é linear (se você dobrar a tensão, dobra a deformação) e elástica (o material retorna Ã  sua forma original). "Isotrópica" porque as propriedades do material são as mesmas em todas as direções.


### Resumo Lei de Hooke Generalizada (ou Tridimensional)

- Lei constitutiva que relaciona tensão com a deformação total e a temperatura
- Lei constitutiva que relaciona deformação com a tensão total e a temperatura


#### 2 fórmulas principais
$$\sigma_{ij} = 2\mu \,\varepsilon_{ij} + \lambda \,(\varepsilon_{kk})\delta_{ij} -(3\lambda + 2\mu)\alpha\Delta T$$
$$\varepsilon_{ij} = \frac{1}{2\mu} \, \sigma_{ij} \;-\; \frac{\nu}{E} \, (\sigma_{kk}) \, \delta_{ij} +(\alpha \Delta T)\delta_{ij}$$
$$\mu= \frac{E}{2(1+\nu)} \quad\lambda = \frac{\nu E}{(1 + \nu)(1 - 2\nu)}$$


#### Equações da tensão
- Calcula a tensão gerada por uma deformação conhecida.
$$\sigma_{ij} = \frac{E}{1 + \nu}\varepsilon_{ij} + \frac{\nu E}{(1 + \nu)(1 - 2\nu)}(\varepsilon_{kk})\delta_{ij} \quad \text{(Fórmula geral)}$$
$$\sigma_{ij} = 2\mu \,\varepsilon_{ij} + \lambda \,(\varepsilon_{kk})\delta_{ij}$$
$$\sigma_{ii} = \frac{E}{(1 + \nu)(1 - 2\nu)}\left((1 - \nu)\varepsilon_{ii} + \nu \sum_{j \neq i}\varepsilon_{jj}\right) \quad \text{(Componentes normais)}$$
$$\tau_{ij} = \frac{E}{1 + \nu}\varepsilon_{ij} = 2\mu \,\varepsilon_{ij}\quad \text{para } i \neq j \quad \text{(Componentes de cisalhamento)}$$
^equacoesDaTensao


#### Equações da deformação
- Calcula a deformação resultante de uma tensão conhecida.
$$\varepsilon_{ij} = \frac{1 + \nu}{E} \, \sigma_{ij} \;-\; \frac{\nu}{E} \, (\sigma_{kk}) \, \delta_{ij}  \quad \text{(Fórmula geral)}$$
$$\varepsilon_{ij} = \frac{1}{2\mu} \, \sigma_{ij} \;-\; \frac{\nu}{E} \, (\sigma_{kk}) \, \delta_{ij} $$
$$\varepsilon_{ii} = \frac{1}{E} \Bigl(\sigma_{ii} \;-\; \nu \sum_{j \neq i} \sigma_{jj}\Bigr)  \quad \text{(Componentes normais)}$$
$$\varepsilon_{ij} = \frac{\gamma_{ij}}{2}= \frac{1 + \nu}{E} \, \tau_{ij}  =\frac{1}{2\mu}\, \tau_{ij}\quad \text{(Componentes de cisalhamento)}$$
^equacoesDaDeformacao


### Equações tensão plana

Por manipulação algébrica, obtém-se as duas fórmulas abaixo para estado de **tensão plana** $(\sigma_{zz} = 0,\; \sigma_{xz} = \sigma_{yz} = 0)$

$$\varepsilon_{zz} = -\frac{\nu}{1-\nu}(\varepsilon_{xx} + \varepsilon_{yy})$$
$$\sigma_{xx} = \frac{E}{1-\nu^2}(\varepsilon_{xx} + \nu\varepsilon_{yy})$$
$$\sigma_{yy} = \frac{E}{1 - \nu^2}(\varepsilon_{yy} + \nu\varepsilon_{xx})$$
$$\tau_{xy} = \frac{E}{2(1 + \nu)}\gamma_{xy}$$^equacoesTensaoPlana


### Interpretação das fórmulas para ajudar a memorizar

$$
\varepsilon_{ii} = \frac{1}{E} \Bigl(\sigma_{ii} \;-\; \nu \sum_{j \neq i} \sigma_{jj}\Bigr)  \quad \text{(Componentes normais)}
$$
Se o coeficiente de Poisson de um material for 0, uma deformação normal do corpo daquele material não vai se importar com tensões nas outras direções, só na direção normal Ã  ela.
Porém, quanto maior o coeficiente de Poisson, mais a deformação vai se importar com as outras tensões normais, pois as deformações que elas estão tentando causar no corpo sobrepõe com a deformação da tensão normal sendo analisada. Ou seja, se ocorrer tração nas tensões $jj$, elas vão atrapalhar a deformação que a tensão $ii$ causaria, e se fossem de compressão, ajudariam, por isso o sinal negativo.



$$
\varepsilon_{ij} = \frac{1 + \nu}{E} \, \tau_{ij} = \frac{1}{2} \,{J} \, \tau_{i} \quad \text{(Componentes de cisalhamento)}
$$

A deformação de cisalhamento no plano de um corpo é a metade de sua conformidade ao cisalhamento $(J)$ vezes a tensão de cisalhamento naquele plano


### Forma geral em tensores (componentes arbitrárias $i, j$)

$$
\varepsilon_{ij} = \frac{1 + \nu}{E} \, \sigma_{ij} \;-\; \frac{\nu}{E} \, (\sigma_{kk}) \, \delta_{ij}
$$
onde

- $\varepsilon_{ij}$ são as componentes do tensor deformação,
- $\sigma_{ij}$ são as componentes do tensor tensão,
- $E$ é o módulo de Young,
- $\nu$ é o coeficiente de Poisson,
- $\sigma_{kk} = \sigma_{11} + \sigma_{22} + \sigma_{33}$ (soma de tensões normais),
- $\delta_{ij}$ é o delta de Kronecker.


### Fórmula para componentes normais (diagonais) da deformação

Para $i = 1, 2, 3$,
$$
\varepsilon_{ii} = \frac{1}{E} \Bigl(\sigma_{ii} \;-\; \nu \sum_{j \neq i} \sigma_{jj}\Bigr)
$$

Isso equivale, em cada direção principal $i$, a
$$
\varepsilon_{11} = \frac{1}{E}\bigl(\sigma_{11} \;-\; \nu \,[\sigma_{22} + \sigma_{33}]\bigr)
$$
$$
\varepsilon_{22} = \frac{1}{E}\bigl(\sigma_{22} \;-\; \nu \,[\sigma_{11} + \sigma_{33}]\bigr)
$$
$$
\varepsilon_{33} = \frac{1}{E}\bigl(\sigma_{33} \;-\; \nu \,[\sigma_{11} + \sigma_{22}]\bigr)
$$


### Fórmula para componentes de cisalhamento

Para $i \neq j$, ou seja, $i, j = 1, 2, 3$ com $i \neq j$,
$$
\varepsilon_{ij} = \frac{1 + \nu}{E} \, \tau_{ij}
$$










# Premise Set 8


## Constantes elásticas em materiais isotrópicos


### Tabela de Propriedades do Material com base no par $$(E, \nu)$$

| Achar $\downarrow$ Dado o par $\rightarrow$      | Variável                | $$(E, \nu)$$                         |
| :----------------------------------------------- | :---------------------- | :----------------------------------- |
| Módulo de Elasticidade /<br>Módulo de Young      | $$E$$                   | $$E$$                                |
| 1ª Constante de Lamé                             | $$\lambda$$             | $$\frac{E\nu}{(1+\nu)(1-2\nu)}$$     |
| 2ª constante de Lamé /<br>Módulo de cisalhamento | $$G = \mu$$             | $$\frac{E}{2(1+\nu)}$$               |
| Razão de Lamé                                    | $$\frac{\lambda}{\mu}$$ | $$\frac{2\nu}{1 - 2\nu}$$            |
| Conformidade de cisalhamento                     | $$J$$                   | $$\frac{2(1+\nu)}{E}$$               |
| Módulo de Compressão                             | $$K$$                   | $$\frac{E}{3(1-2\nu)}$$              |
| Compressibilidade volumétrica                    | $$\beta$$               | $$\frac{3(1-2\nu)}{E}$$              |
| Razão de Poisson                                 | $$\nu$$                 | $$\nu$$                              |
| Módulo longitudinal /<br>Módulo P ou M           | $$M$$                   | $$\frac{E(1-\nu)}{(1+\nu)(1-2\nu)}$$ |




---


### Tabela 2

| Achar $\downarrow$ Dado o par $\rightarrow$      | Variável                | $$(E, G)$$               | $$(E, K)$$                | $$(E, \nu)$$                         | $$(K, \nu)$$                        |
| :----------------------------------------------- | :---------------------- | :----------------------- | :------------------------ | :----------------------------------- | :---------------------------------- |
| Módulo de Elasticidade /<br>Módulo de Young      | $$E$$                   | $$E$$                    | $$E$$                     | $$E$$                                | $$3K(1-2\nu)$$                      |
| 1ª Constante de Lamé                             | $$\lambda$$             | $$\frac{G(E-2G)}{3G-E}$$ | $$\frac{3K(3K-E)}{9K-E}$$ | $$\frac{E\nu}{(1+\nu)(1-2\nu)}$$     | $$\frac{3K\nu}{1 + \nu}$$           |
| 2ª constante de Lamé /<br>Módulo de cisalhamento | $$G = \mu$$             | $$G$$                    | $$\frac{3KE}{9K-E}$$      | $$\frac{E}{2(1+\nu)}$$               | $$\frac{3K(1 - 2\nu)}{2(1 + \nu)}$$ |
| Razão de Lamé                                    | $$\frac{\lambda}{\mu}$$ |                          |                           | $$\frac{2\nu}{1 - 2\nu}$$            |                                     |
| Conformidade de cisalhamento                     | $$J$$                   | $$\frac{1}{G}$$          |                           |                                      |                                     |
| Módulo de Compressão                             | $$K$$                   | $$\frac{EG}{3(3G-E)}$$   | $$K$$                     | $$\frac{E}{3(1-2\nu)}$$              | $$K$$                               |
| Compressibilidade volumétrica                    | $$\beta$$               |                          | $$\frac{1}{K}$$           |                                      |                                     |
| Razão de Poisson                                 | $$\nu$$                 | $$\frac{E}{2G}-1$$       | $$\frac{3K-E}{6K}$$       | $$\nu$$                              | $$\nu$$                             |
| Módulo longitudinal /<br>Módulo P ou M           | $$M$$                   | $$\frac{G(4G-E)}{3G-E}$$ | $$\frac{3K(3K+E)}{9K-E}$$ | $$\frac{E(1-\nu)}{(1+\nu)(1-2\nu)}$$ | $$\frac{3K(1 - \nu)}{1 + \nu}$$     |


### Tabela 3

| Achar $\downarrow$ Dado o par $\rightarrow$ | Variável    | $$(K, G)$$                | $$(G, \nu)$$                    | $$(\lambda, G)$$                     |
| :------------------------------------------ | :---------- | :------------------------ | :------------------------------ | :----------------------------------- |
| Módulo de Elasticidade /<br>Módulo de Young | $$E$$       | $$\frac{9KG}{3K+G}$$      | $$2G(1+\nu)$$                   | $$\frac{G(3\lambda+2G)}{\lambda+G}$$ |
| 1ª Constante de Lamé                        | $$\lambda$$ | $$K-\frac{2}{3}G$$        | $$\frac{2G\nu}{1-2\nu}$$        | $$\lambda$$                          |
| 2ª de Lamé /<br>Módulo de cisalhamento      | $$G = \mu$$ | $$G$$                     | $$G$$                           | $$G$$                                |
| Conformidade de Cisalhamento                | $$J$$       | $$\frac{1}{G}$$           | $$\frac{1}{G}$$                 | $$\frac{1}{G}$$                      |
| Módulo de Compressão                        | $$K$$       | $$K$$                     | $$\frac{2G(1+\nu)}{3(1-2\nu)}$$ | $$\lambda+\frac{2}{3}G$$             |
| Compressibilidade Volumétrica               | $$\beta$$   | $$\frac{1}{K}$$           | $$\frac{3(1-2\nu)}{2G(1+\nu)}$$ | $$\frac{1}{\lambda+\frac{2}{3}G}$$   |
| Razão de Poisson                            | $$\nu$$     | $$\frac{3K-2G}{2(3K+G)}$$ | $$\nu$$                         | $$\frac{\lambda}{2(\lambda+G)}$$     |
| Módulo longitudinal /<br>Módulo P ou M      | $$M$$       | $$K+\frac{4}{3}G$$        | $$\frac{2G(1-\nu)}{1-2\nu}$$    | $$\lambda+2G$$                       |










# Premise Set 9


## Definição coeficiente de Poisson

O coeficiente de Poisson pode ser pensado em quanto o corpo vai se empenhar para mudar sua área de seção transversal por causa da variação do comprimento.

Um coeficiente de Poisson igual a 0 indica que o corpo não está nem aí para a variação de volume, então não vai mudar sua área de seção transversal para compensar a mudança de comprimento.

Um coeficiente de Poisson igual a 0,5 indica que o corpo se importa o máximo com seu volume, então ele vai mudar sua área de seção transversal para compensar perfeitamente a variação de comprimento.

E os demais coeficientes de Poisson podem ser deduzidos como o quanto a área de seção transversal do corpo vai mudar a fim de manter o volume constante, ou seja, quanto maior o valor, mais sua área de seção transversal vai mudar com compressão/tração.










# Premise Set 10


## Conjunto de premissas

- [[ps18]]


## Ã‚ngulos diretores e cossenos diretores


### Caso 2D


#### Ã‚ngulos diretores
**Premissa**: Os eixos de coordenadas são $X$ e $Y$; Existe um vetor $\vec v = (v_x, v_y)$ Ã  um ângulo $\theta_x$ de $X$

Em 2D, os "ângulos diretores" de um vetor $\vec v$ são de fato os ângulos que ele forma com cada um dos versos dos eixos do sistema, normalmente:
$$
\hat{\imath} = (1,0), \quad \hat{\jmath} = (0,1).
$$
Em notação mais completa, podemos escrever:
$$
\Theta = (\theta_x, \theta_y), \quad \text{onde} \quad \theta_x = \angle(v, \hat{\imath}), \quad \theta_y = \angle(v, \hat{\jmath}).
$$

- Como os eixos X e Y são perpendiculares, $\theta_y = 90^\circ - \theta_x$.


#### Cossenos diretores
Os cossenos diretores são simplesmente os cossenos dos ângulos diretores, ou seja:
$$
L = (l_x, l_y) = (\cos \theta_x, \cos \theta_y) = (\cos \theta_x, \cos(90^\circ - \theta_x)) = (\cos \theta_x, \sin \theta_x).
$$

Isso coincide exatamente com a representação habitual de um vetor unitário em 2D
$$
\hat v = (\cos \theta_x, \sin \theta_x).
$$
Ou seja, os **cossenos diretores** de um vetor nada mais são do que os valores do **vetor normalizado**
$$L = (l_x, l_y) = \hat v = \frac{v}{\|v\|} = \left(\frac{v_x}{\|v\|}, \frac{v_y}{\|v\|}\right)
$$
Sendo
$$\|v\| = \sqrt{v_x^2 + v_y^2}$$
Além disso, vale notar que os cossenos diretores satisfazem
$$
\cos^2 \theta_x + \cos^2 \theta_y = \cos^2 \theta_x + \sin^2 \theta_x = 1,
$$
o que confirma que $L$ é de comprimento unitário.


#### Exemplo
Determine os ângulos diretores e cossenos diretores do vetor $\vec v = (4, 3)$
- $\vec v=(v_x,v_y)=(4,3)$
- $\|\vec v\|=\sqrt{4^2+3^2}=5$
- $\cos\theta_x=\frac{v_x}{\|\vec v\|}=\frac{4}{5}$
- $\cos(\theta_y)=\sin(\theta_x)=\frac{v_y}{\|\vec v\|}=\frac{3}{5}$
- $L= \hat v=(l_x,l_y)=(\cos\theta_x,\cos\theta_y)=\left(\frac{v_x}{\|v\|}, \frac{v_y}{\|v\|}\right)=(\tfrac{4}{5},\tfrac{3}{5})$
  Note que $\|L\|=\sqrt{\bigl(\tfrac{4}{5}\bigr)^2+\bigl(\tfrac{3}{5}\bigr)^2}=1$, pois $L= \hat v$ que é um vetor unitário
- $\Theta=(\theta_x,\theta_y)=(\arccos(4/5),\arccos(3/5))\to(36.87^\circ,\,53.13^\circ)$
- Note que $\theta_y=90^\circ-\theta_x$


### Caso 3D


#### Ã‚ngulos diretores

Premissa: Os eixos de coordenadas são $X$, $Y$ e $Z$; existe um vetor
$$\vec{v} = (v_x,\, v_y,\, v_z)$$ que forma os ângulos

$$\alpha = \angle(\vec{v},\vec{i}),
\qquad
\beta = \angle(\vec{v},\vec{j}),
\qquad
\gamma = \angle(\vec{v},\vec{k})$$
com os versos positivos dos eixos $X$, $Y$ e $Z$, onde
$$\vec{i} = (1,0,0),
\qquad
\vec{j} = (0,1,0),
\qquad
\vec{k} = (0,0,1).$$
Assim, o vetor de ângulos diretores é
$$\Theta = (\alpha, \beta, \gamma).$$


#### Cossenos diretores
>Os cossenos diretores são
>$$L = (l_x, l_y, l_z) = (\cos\alpha, \cos\beta, \cos\gamma).$$
>Partindo da definição de produto escalar, nota-se que
>$$\cos\alpha = \frac{\vec{v}\!\cdot\!\vec{i}}{\lVert\vec{v}\rVert} = \frac{v_x}{\lVert\vec{v}\rVert},\qquad
\cos\beta  = \frac{v_y}{\lVert\vec{v}\rVert},\qquad
\cos\gamma = \frac{v_z}{\lVert\vec{v}\rVert}$$
>isto é, $L$ coincide com o vetor unitário $\hat{v}$:
>$$L = \hat{v} = \frac{\vec{v}}{\lVert\vec{v}\rVert}= \left(\frac{v_x}{\lVert\vec{v}\rVert},\frac{v_y}{\lVert\vec{v}\rVert}, \frac{v_z}{\lVert\vec{v}\rVert}             \right), \qquad \lVert\vec{v}\rVert = \sqrt{v_x^{2}+v_y^{2}+v_z^{2}}$$
>Os cossenos diretores satisfazem a identidade fundamental
>$$\cos^{2}\alpha + \cos^{2}\beta + \cos^{2}\gamma = 1$$
>confirmando que $L$ tem comprimento unitário.
^cossenosDiretores


#### Exemplo
Determine os ângulos e cossenos diretores do vetor
$$\vec{v} = (4,\,3,\,12).$$
1. Norma
$$
\lVert\vec{v}\rVert = \sqrt{4^{2}+3^{2}+12^{2}}
                     = \sqrt{16+9+144}
                     = \sqrt{169}
                     = 13.
$$  2. Cossenos diretores
$$
l_x = \frac{4}{13},\qquad
l_y = \frac{3}{13},\qquad
l_z = \frac{12}{13}.
$$
2. Ã‚ngulos diretores
$$
\alpha = \arccos\!\left(\frac{4}{13}\right) \approx 72,54^{\circ},\qquad
\beta  = \arccos\!\left(\frac{3}{13}\right) \approx 76,68^{\circ},\qquad
\gamma = \arccos\!\left(\frac{12}{13}\right) \approx 22,62^{\circ}.
$$

3. Verificação da identidade
$$
\left(\tfrac{4}{13}\right)^{2}+
\left(\tfrac{3}{13}\right)^{2}+
\left(\tfrac{12}{13}\right)^{2}
   = \tfrac{16+9+144}{169}
   = \tfrac{169}{169}
   = 1.
$$ Portanto,  $$
\Theta = (\alpha, \beta, \gamma) \approx (72,54^{\circ},\,76,68^{\circ},\,22,62^{\circ}),
\qquad
L = (l_x, l_y, l_z) = \left(\tfrac{4}{13},\,\tfrac{3}{13},\,\tfrac{12}{13}\right).
$$  Esses valores demonstram como, em 3 D, o vetor unitário $\hat{v}$ coincide exatamente com os cossenos diretores, generalizando o resultado observado no caso 2 D.










# Premise Set 11


## Conjunto de Premissas
- [[ps5]]
- [[ps6]]
- [[ps10]]


## Análise de tensões em um corpo estático (Elemento de estresse e círculo de Mohr)

(Premissa: o corpo encontra"‘se em equilíbrio estático. Não consideraremos acelerações ou variações de temperatura)


## 1 Elemento de estresse (ou tensão)


### 1.1 Conceito
O elemento de estresse é um **recorte imaginário** de um ponto de interesse do corpo para avaliarmos as tensões normais $(\sigma)$ e de cisalhamento $(\tau)$. Matematicamente, as tensões são obtidas como o limite da razão entre a força $F$ aplicada e a área $A$ do recorte quando esta tende a zero:
$$
\sigma, \tau = \lim_{A \to 0} \frac{F}{A}
$$

**O que não é:** Não se trata de um grão ou partícula material do corpo sendo estudado. Então, quando falamos sobre rotação do elemento de estresse, não há rotação do corpo, mas sim da nossa análise.


### 1.2 Orientação dos planos principais
Nem sempre o elemento está inicialmente orientado de forma a expor as magnitudes extremas de tensão, especialmente relevantes para critérios de falha. Portanto precisamos saber quantos graus devemos rotacionar nosso recorte imaginário para que ele revele esses dois valores. Ao girar o elemento em torno de seu ponto, podemos alinhar nossa análise com:
- **Planos principais** "“ revelam as **tensões normais máximas e mínimas** $(\sigma_{\max},\sigma_{\min})$.
- **Planos de cisalhamento máximo** "“ revelam a **tensão de cisalhamento máxima** $(\tau_{\max})$.


### 1.3 Definições e cálculos
$$\phi_1 = \text{Ã‚ngulo de rotação para atingir tensão normal máxima } (\sigma_{1})$$
$$\phi_S = \text{Ã‚ngulo de rotação para atingir tensão de cisalhamento máxima}$$
$$
\phi_S = \phi_1 + 45^\circ
$$
$$\text{Cossenos diretores dos planos principais} $$

$$
\vec n_1
\begin{dcases}
\text{Cosseno diretor do plano de tensão normal máxima } (\sigma_{1})\\
= (\cos(\phi_1) ,\, \cos(90°-\phi_1)) \\
= (\cos(\phi_1) ,\, \sin(\phi_1)) \\
= (\cos(\phi) ,\, \sin(\phi)) \\
\end{dcases}
$$
$$
\vec n_S
\begin{dcases}
\text{Cosseno diretor do plano de tensão de cisalhamento máxima} \\
= (\cos(\phi_S) ,\, \cos(90°-\phi_S)) \\
= (\cos(\phi_S) ,\, \sin(\phi_S))\\
= (\cos(\phi + 45°) ,\, \sin(\phi + 45°))
\end{dcases}
$$

>[!info] Observações
>- Como $\phi_S = \phi_P + 45^\circ$, normalmente usa-se apenas $\phi$ e $\phi+45°$, ou seja, $\vec n_P = (\cos(\phi) \,, \sin(\phi))$ e $\vec n_S = (\cos(\phi + 45°) \,, \sin(\phi + 45°))$
>- Como explicado na nota [[ps10]], o **cosseno diretor do plano** principal não é nada mais que o **vetor unitário normal** aquele plano, por isso a notação é $\vec n$

$$
\tau_\text{max}
\begin{dcases}
\text{Máximo estresse de cisalhamento} \\
\text{Tensão máxima de cisalhamento} \\
=\frac{\sigma_\text{max}-\sigma_\text{min}}{2} \\
\tau_{\max}^{(2D)} = \frac{\sigma_1 - \sigma_2}{2} \\
\tau_{\max}^{(3D)}= \frac{\sigma_1 - \sigma_3}{2} \\
\text{Ã‰ o raio do círculo de Mohr} \\
\tau_{\max}^{(2D)} =\sqrt{ (\sigma_{xx} - \sigma_{medio})^2 + \tau_{max}^2 }
\end{dcases}
$$
^tensaoMaximaCisalhamento

$$
\sigma_{\text{med}}
\begin{dcases}
\text{Tensão média} \\
\text{Tensão média de Mohr} \\
\text{Tensão normal média} \\
\sigma_{\text{med}}^{(2D)} = \frac{\sigma_1 + \sigma_2}{2}\\
\sigma_{\text{med}}^{(2D)} = \frac{\sigma_{xx} + \sigma_{yy}}{2} \quad\text{em um elemento genérico 2D}\\
\sigma_{\text{med}}^{(3D)}= \frac{\sigma_1 + \sigma_3}{2} \\
\text{Ã‰ o centro do círculo de Mohr} \\
\end{dcases}
$$
^tensaoMedia

$$
\sigma_1 \,, \sigma_2 \,, \sigma_3
\begin{dcases}
\text{Tensões principais} \\
\text{Estresses principais} \\
\text{Componentes principais de tensões} \\
\sigma_1 \gt \sigma_2 \gt \sigma_3 \quad \text{por definição} \\
\\
\sigma_{{\max}}^{(2D)} = \sigma_1  \quad \sigma_{min}^{(2D)} = \sigma_2\\
\sigma_{\text{1}}^{(2D)} = \sigma_{\mathrm{med}} + \tau_{max} \\
\sigma_{\text{2}}^{(2D)} = \sigma_{\mathrm{med}} - \tau_{max}\\
\\
\sigma_{max}^{(3D)} = \sigma_1  \quad \sigma_{min}^{(3D)} = \sigma_3 \\
\end{dcases}
$$
^tensoesPrincipais

- Um mesmo elemento revela $\tau_{\max}$ apenas quando girado de $\phi_S$ em relação Ã  orientação original.
- Ao contrário das tensões normais principais, o elemento de estresse, quando orientado de forma a revelar $\tau_\text{max}$, apresenta tensões normais não são nulas.  $\sigma_{\text{med}}$ é o valor das tensões normais atuando nas faces.


### 1.3.1 Tensões principais, [autovalores e autovetores](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors)
- As **tensões principais** são os **autovalores** do tensor de tensões, e as **direções principais** são seus **autovetores**.
- Existe uma orientação especial do elemento de estresse na qual todas as tensões de cisalhamento $\tau_{ij}$ são zero e todas as tensões normais são extremas (máximo, mínimo e um valor intermediário)). Estas são chamadas de tensões principais, denotadas por $\sigma_{1}, \sigma_{2} \text{ e } \sigma_{3}$ ou $\lambda_{1}, \lambda_{2} \, { e } \, \lambda_{3}$ **(autovalor)**
- Cada tensão principal atua perpendicularmente a um plano específico, chamado de plano principal. O plano principal onde atua a tensão principal $\lambda_{1}$ possui o vetor normal unitário $\vec{n}_{1}$.
- Existe um vetor paralelo Ã  $\hat{{n}_{1}}$ chamado $\vec{v}_{1}$ **(autovetor)** tal que quando multiplicado tanto pelo tensor de tensões $\sigma$ quanto pelo escalar $\lambda_{1}$ resulta em um mesmo terceiro vetor.
$$[\sigma] \,\vec{v_{i}} = \lambda_{i} \,\vec{v_{i}}$$
$$[\sigma] \,\vec{v_{i}} - \lambda_{i} \,\vec{v_{i}} = 0$$
$$[\sigma] \,\vec{v_{i}} - \lambda_{i} \,\vec{v_{i}} = ([\sigma] - \lambda_{i} )\vec{v_{i}} = ([\sigma] - \lambda_{i}[I] )\vec{v_{i}} $$
---
$$det([\sigma] - \lambda[I]) = 0 \rightarrow \lambda_1, \lambda_2, \lambda_{3}$$
$$([\sigma] - \lambda_{i} [I])\vec{v_{i}} = \vec{0}$$
$$\theta_{p_{1}} = \arctan \left( \frac{v_{1y}}{v_{1x}} \right) \quad \hat{n}_i = \frac{v_i}{||v_i||} =(\cos(\theta_{p_{1}}), \sin(\theta_{p_{1}}))$$
^autovaloreAutovetores
---

Nuância da definição: existe sim uma orientação na qual uma face tem tensão normal igual a $\sigma_{1}$ e as outras não têm $\sigma_{2} \text{ e } \sigma_{3}$. Esse estado **não** está orientado segundo as direções principais.


#### $\hat{n}_{1}$ vai indicar o vetor normal que a face do elemento $yz$ vai ter após a rotação para alcançar máxima deformação normal?
O vetor $\hat{n}_1$, que é o autovetor associado ao autovalor $\varepsilon_1$, representa exatamente a direção normal a um plano que, após a deformação, experimenta a máxima deformação normal $\varepsilon_1$

Para detalhar um pouco mais:
- Estado Inicial: Imagine um cubo infinitesimal de material perfeitamente alinhado com os eixos x, y, z. A face yz deste cubo tem um vetor normal apontando na direção do eixo x, ou seja, $\hat{i} = [1, 0, 0]^T$.
- Estado Deformado e Rotação: Quando o tensor de deformação $[\varepsilon]$ é aplicado, este cubo não apenas se deforma, mas também pode ser visto como girando no espaço. As direções principais $(\hat{n}_1, \hat{n}_2, \hat{n}_3)$ definem a orientação de um novo sistema de eixos $(x', y', z')$ no qual a deformação é "pura", ou seja, sem componentes de cisalhamento.
- $\hat{n}_1$ é o vetor unitário que define a direção do novo eixo $x'$. Um plano perpendicular a este vetor (ou seja, o novo plano $y'z'$) é o plano que sofre a deformação normal principal $\varepsilon_1$.


#### 1.3.1.1 Vetor de tensões
A primeira linha (ou coluna, por simetria) do tensor de tensões é, por definição, o vetor de tensão que atua na face de um cubo infinitesimal cuja normal aponta na direção correspondente ao número da linha (linha 1 = X, linha 2 = Y, linha 3 = Z)
$$
t = \sigma \cdot n
$$
$$
t_{x} =
\begin{pmatrix}
t_{xx} \\
t_{xy} \\
t_{xz}
\end{pmatrix}
=
\begin{pmatrix}
\sigma_{xx} & \sigma_{xy} & \sigma_{xz} \\
\sigma_{yx} & \sigma_{yy} & \sigma_{yz} \\
\sigma_{zx} & \sigma_{zy} & \sigma_{zz}
\end{pmatrix}
\begin{pmatrix}
n_{xx} \\
n_{xy} \\
n_{xz}
\end{pmatrix}
$$
$$
n_{x}= \begin{pmatrix}
n_{xx} \\
n_{xy} \\
n_{xz}
\end{pmatrix}=
\begin{pmatrix}
1 \\
0 \\
0
\end{pmatrix}$$
$$t_{x} =
\begin{pmatrix}
t_{xx} \\
t_{xy} \\
t_{xz}
\end{pmatrix}
=
\begin{pmatrix}
(\sigma_{xx} \cdot 1) + (\sigma_{xy} \cdot 0) + (\sigma_{xz} \cdot 0) \\
(\sigma_{yx} \cdot 1) + (\sigma_{yy} \cdot 0) + (\sigma_{yz} \cdot 0) \\
(\sigma_{zx} \cdot 1) + (\sigma_{zy} \cdot 0) + (\sigma_{zz} \cdot 0)
\end{pmatrix}
=
\begin{pmatrix}
\sigma_{xx} \\
\sigma_{yx} \\
\sigma_{zx}
\end{pmatrix}
=
\begin{pmatrix}
\sigma_{xx} \\
\sigma_{xy} \\
\sigma_{xz}
\end{pmatrix}
$$


## 2 [Círculo de Mohr](https://en.wikipedia.org/wiki/Mohr%27s_circle)
- https://www.pantelisliolios.com/mohr-circle/
- https://www.pantelisliolios.com/mohr-circle-3d/

- O círculo de Mohr representa graficamente o conjunto de todos os pares $(\sigma \, , \tau)$ que podemos obter ao rotacionar o elemento de estresse
- O eixo horizontal representa a tensão normal $\sigma$ e o vertical, a tensão de cisalhamento $\tau$


### Eixo vertical para baixo
O círculo de Mohr é convencionalmente desenhado com o sentido positiva do eixo vertical para baixo. A principal vantagem é a correspondência direta do sentido de rotação entre o elemento e o círculo. Uma rotação anti-horária no elemento é representada por uma rotação anti-horária no círculo.
![[ps11.png]]


### Círculo de Mohr 3D e solução analítica
Para desenhar o Círculo de Mohr para um estado 3D de deformação (ou tensão), você geralmente precisa primeiro encontrar as deformações principais (Îµâ‚, Îµâ‚‚, Îµâ‚ƒ) através do método analítico (resolvendo a equação de autovalores).

Isso é diferente do caso 2D, onde você pode construir o círculo diretamente a partir dos componentes Îµâ‚“, Îµáµ§ e Î³â‚“áµ§, e então usar o círculo para encontrar as deformações principais e a orientação.

Então, se o trabalho pesado de cálculo já foi feito, por que alguém se daria ao trabalho de desenhar o Círculo de Mohr 3D?

A resposta é que seu valor não está no cálculo inicial, mas sim na visualização, interpretação e análise subsequente do estado de deformação.










# Premise Set 12


## EDO Linear Homogênea de 2ª ordem com coeficientes constantes

$$
\text{Equação diferencial:} \qquad a_2 y'' + a_1 y' + a_0 y = 0.
$$
$$
\text{Equação característica:} \qquad a_2 r^2 + a_1 r + a_0 = 0,
$$
$$
\boxed{[\Delta > 0]\text{ (raízes reais e distintas)} \qquad y = c_1 e^{r_1x} + c_2 e^{r_2x}}
$$
$$\boxed{[\Delta = 0]\text{ (raízes iguais)} \qquad y(x) = c_1 e^{r x} + c_2 x e^{r x}}$$$$
\boxed{[\Delta < 0] \text{ (raízes complexas)} \qquad y(x) = c_1 e^{\lambda x} \cos \mu x + c_2 e^{\lambda x} \sin \mu x}
$$$$
r_1 = \lambda + i\mu \quad \text{e} \quad r_2 = \lambda - i\mu
$$
$$
y(x) = c_1 e^{(\lambda + i\mu)x} + c_2 e^{(\lambda - i\mu)x}
$$

---
Método de redução de ordem para quando $\Delta = 0$
$$
y'' + p(x) y' + q(x) y = 0
$$
$$
y_2(x) = u(x) y_1(x) = y_1(x) \int \frac{e^{-\int p(x)\,dx}}{[y_1(x)]^2}\,dx
$$

---


## Wronskiano


### Definição geral

Seja um conjunto de $n$ funções
$$
y_1(x),\quad y_2(x),\quad \dots,\quad y_n(x)
$$
definidas num intervalo $I$. O Wronskiano $W(y_1, \dots, y_n)(x)$ é o determinante da matriz cujas colunas são essas funções e suas derivadas até a ordem $n-1$:
$$
W(y_1, \dots, y_n)(x) =
\begin{vmatrix}
y_1(x) & y_2(x) & \cdots & y_n(x) \\
y_1'(x) & y_2'(x) & \cdots & y_n'(x) \\
\vdots & \vdots & \ddots & \vdots \\
y_1^{(n-1)}(x) & y_2^{(n-1)}(x) & \cdots & y_n^{(n-1)}(x)
\end{vmatrix}.
$$

- Se $W(x) \neq 0$ em $I$, as funções são linearmente independentes em $I$.
- Se $W(x) = 0$, pode haver dependência linear (não é garantia de dependência para $n > 2$, mas geralmente indica falta de independência).


## EDO de 2ª ordem

Para duas soluções $y_1, y_2$ de uma EDO de $2^a$ ordem, o Wronskiano é
$$
W(y_1, y_2)(x) =
\begin{vmatrix}
y_1(x) & y_2(x) \\
y_1'(x) & y_2'(x)
\end{vmatrix}
= y_1(x) y_2'(x) - y_1'(x) y_2(x).
$$

**Exemplo:**
Considere $y_1(x) = e^{2x}$ e $y_2(x) = e^{-x}$. Então
$$
y_1'(x) = 2e^{2x}, \quad y_2'(x) = -e^{-x},
$$
$$
W(e^{2x}, e^{-x})(x) = e^{2x}(-e^{-x}) - (2e^{2x})(e^{-x}) = -e^x - 2e^x = -3e^x,
$$
que nunca se anula, logo as duas soluções são independentes.










# Premise Set 13


## EDO Não Homogênea

$$
y'' + p(t)y' + q(t)y = f(t)
$$
$$
y(x) = y_h(x) + y_p(x),
$$


### Método dos coeficientes indeterminados


### Polinômio
Se $f$ é um polinômio de grau $m$, admitimos
$$
y_p(x) = A_m x^m + A_{m-1}x^{m-1} + \dots + A_1 x + A_0,
$$

$$
\boxed{
\begin{aligned}
\text{Se } P(0) \neq 0 &: \text{ supõe } y_p = A_0 + A_1 x + \dots + A_m x^m \\
\text{Se } P(0) = 0 \text{ e } P'(0) \neq 0 &: \text{ supõe } y_p = x(A_0 + A_1 x + \dots + A_m x^m) \\
\text{Se } P(0) = 0 \text{ e } P'(0) = 0 &: \text{ supõe } y_p = x^2(A_0 + A_1 x + \dots + A_m x^m)
\end{aligned}
}
$$


### Exponencial
Se $f$ é uma função exponencial da forma
$$
f(x) = ae^{\beta x},
$$
admitimos uma solução particular da forma
$$
y_p(x) = Ae^{\beta x}.
$$


### Seno e Cosseno
Se $f$ é uma combinação linear das funções seno e cosseno, ou seja,
$$
f(x) = a \cos(\omega x) + b \sin(\omega x),
$$
admitimos uma solução particular da forma
$$
y_p(x) = A \cos(\omega x) + B \sin(\omega x).
$$


## Exponencial + Polinômio

Para funções da forma
$$
f(x) = (b_0 + b_1 x + \dots + b_m x^m) e^{\beta x},
$$

$$
\boxed{
\begin{aligned}
\text{Se } P(\beta) \neq 0 &: \text{ supõe } y_p = (A_0 + A_1 x + \dots + A_m x^m) e^{\beta x} \\
\text{Se } P(\beta) = 0 \text{ e } P'(\beta) \neq 0 &: \text{ supõe } y_p = x(A_0 + A_1 x + \dots + A_m x^m) e^{\beta x} \\
\text{Se } P(\beta) = 0 \text{ e } P'(\beta) = 0 &: \text{ supõe } y_p = x^2(A_0 + A_1 x + \dots + A_m x^m) e^{\beta x}
\end{aligned}
}
$$










# Premise Set 14


O momento de inércia tem unidade kg·m². Para entender por que, basta lembrar da relação fundamental da rotação:

$$
Ï„ = I\,Î±,
$$

onde $Ï„$ (torque) é medido em newton-metro (N·m) e $Î±$ (aceleração angular) em rad/s². Como o radiano não tem dimensão, podemos enxergar $I$ como sendo N·m dividido por (rad/s²), ou seja, N·m·s². Mas sabemos que $1\text{ N} = 1\text{ kg·m/s}^2$, então:

$$
N \cdot m \cdot s^2 \;=\; (\text{kg·m/s}^2)\cdot m \cdot s^2 \;=\; \text{kg·m}^2.
$$

Em outras palavras, quando dizemos que um corpo rígido tem momento de inércia $I = 5\text{ kg·m}^2$, isso significa que, para produzir uma aceleração angular de $1\text{ rad/s}^2$, precisamos aplicar um torque de $5\text{ N·m}$. Se quisermos acelerar esse mesmo corpo a $2\text{ rad/s}^2$, o torque necessário será $I \times 2 = 5 \times 2 = 10\text{ N·m}$, e assim por diante.

Dessa forma, o valor numérico de $I$ responde exatamente Ã  pergunta: "Quantos newton-metros de torque são necessários para gerar $1\text{ rad/s}^2$ de aceleração angular nesse corpo?" Quanto maior for $I$, maior será o torque exigido para atingir a mesma aceleração.


## Constante de torção

- A unidade da constante de torção de um fio é $[\mathrm{N\,m/rad}]$. Isso indica o torque em N\,m necessário para torcer o fio 1 radiano, ou cerca de 57° (já que 180° = $\pi$ radianos).
- Ou seja, a unidade $\mathrm{N\cdot m/rad}$ responde Ã  pergunta: "Quantos newton-metros de torque preciso aplicar para obter exatamente uma variação angular de 1 rad (â‰ˆ57°) no fio?"










# Premise Set 15

Apesar de ambos possuírem a mesma unidade $N/m^2 = Pa \text{ (Pascals)}$, são coisas diferentes.

Pressão é um **escalar**, ou seja, um número real específico
Estresse é um **tensor** (de segunda ordem), ou seja, uma matrix 3x3.

Pressão é um caso específico de estresse. Ã‰ quando o estresse normal é isotrópico e igual em todas as faces e age por compressão.
$$
p = -\frac{1}{3} \left( \sigma_{xx} + \sigma_{yy} + \sigma_{zz} \right),
$$










# Premise Set 16

[[q50]]
[[q51]]










# Premise Set 17


## Tabela 1: Regras de Derivação e Integração por Função


### Regras Gerais

| Regra / Função     | Derivada $$\frac{d}{dx}$$                                    | Integral Indefinida $$\int \dots dx$$                                    |
| :----------------- | :----------------------------------------------------------- | :----------------------------------------------------------------------- |
| Múltiplo Constante | $$\frac{d}{dx}[k \cdot f(x)] = k \cdot f'(x)$$                | $$\int k \cdot f(x) \, dx = k \int f(x) \, dx$$                          |
| Soma / Subtração   | $$\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)$$             | $$\int [f(x) \pm g(x)] \, dx = \int f(x)\,dx \pm \int g(x)\,dx$$         |


### Potências e Polinômios

| Regra / Função           | Derivada $$\frac{d}{dx}$$                       | Integral Indefinida $$\int \dots dx$$                          |
| :----------------------- | :---------------------------------------------- | :------------------------------------------------------------- |
| Função Constante         | $$\frac{d}{dx}(k) = 0$$                         | $$\int k \, dx = kx + C$$                                      |
| Regra da Potência        | $$\frac{d}{dx}(x^n) = n x^{n-1}$$               | $$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$$ |
| Regra da Potência (n=-1) | $$\frac{d}{dx}(\ln\|x\|) = \frac{1}{x}$$         | $$\int \frac{1}{x} \, dx = \ln\|x\| + C$$                     |


### Exponenciais e Logarítmicas

| Função               | Derivada $$\frac{d}{dx}$$                             | Integral Indefinida $$\int \dots dx$$                                        |
| :------------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------- |
| Exponencial Natural  | $$\frac{d}{dx}(e^x) = e^x$$                           | $$\int e^x \, dx = e^x + C$$                                                 |
| Exponencial (base a) | $$\frac{d}{dx}(a^x) = a^x \ln(a)$$                    | $$\int a^x \, dx = \frac{a^x}{\ln(a)} + C$$                                  |
| Logaritmo Natural    | $$\frac{d}{dx}(\ln x) = \frac{1}{x}, \quad (x>0)$$     | $$\int \ln(x) \, dx = x\ln(x) - x + C$$ (via Integração por Partes)          |


### Funções Trigonométricas

| Função     | Derivada $$\frac{d}{dx}$$                                   | Integral Indefinida $$\int \dots dx$$                                        |
| :--------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Seno       | $$\frac{d}{dx}(\sin x) = \cos x$$                           | $$\int \sin x \, dx = -\cos x + C$$                                          |
| Cosseno    | $$\frac{d}{dx}(\cos x) = -\sin x$$                          | $$\int \cos x \, dx = \sin x + C$$                                           |
| Tangente   | $$\frac{d}{dx}(\tan x) = \sec^2 x$$                         | $$\int \tan x \, dx = \ln\|\sec x\| + C$$                                    |
| Cotangente | $$\frac{d}{dx}(\cot x) = -\csc^2 x$$                        | $$\int \cot x \, dx = \ln\|\sin x\| + C$$                                    |
| Secante    | $$\frac{d}{dx}(\sec x) = \sec x \tan x$$                    | $$\int \sec x \, dx = \ln\|\sec x + \tan x\| + C$$                           |
| Cosecante  | $$\frac{d}{dx}(\csc x) = -\csc x \cot x$$                   | $$\int \csc x \, dx = \ln\|\csc x - \cot x\| + C$$                           |


### Funções Trigonométricas Inversas

| Função        | Derivada $$\frac{d}{dx}$$                                    | Integral Indefinida $$\int \dots dx$$                        |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Arco Seno     | $$\frac{d}{dx}(\arcsin x) = \frac{1}{\sqrt{1-x^2}}$$          | $$\int \frac{1}{\sqrt{1-x^2}} \, dx = \arcsin x + C$$        |
| Arco Cosseno  | $$\frac{d}{dx}(\arccos x) = -\frac{1}{\sqrt{1-x^2}}$$         | $$\int -\frac{1}{\sqrt{1-x^2}} \, dx = \arccos x + C$$       |
| Arco Tangente | $$\frac{d}{dx}(\arctan x) = \frac{1}{1+x^2}$$                | $$\int \frac{1}{1+x^2} \, dx = \arctan x + C$$              |

---


## Tabela 2: Técnicas Principais de Derivação e Integração (Relação Inversa)

| Técnica                   | Derivação (Regra)                                                      | Integração (Técnica Inversa/Relacionada)                                                |
| :------------------------ | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **Composição de Funções** | **Regra da Cadeia** <br> $$\frac{d}{dx}[f(g(x))] = f'(g(x)) g'(x)$$    | **Integração por Substituição (Regra do u)** <br> $$\int f(g(x))g'(x)dx = \int f(u)du$$ |
| **Produto de Funções**    | **Regra do Produto** <br> $$(uv)' = u'v + uv'$$                        | **Integração por Partes** <br> $$\int u \, dv = uv - \int v \, du$$                     |
| **Quociente de Funções**  | **Regra do Quociente** <br> $$(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$$ | (Não possui um inverso direto, mas leva a técnicas como Frações Parciais)               |










# Premise Set 18


## Relações trigonométricas


## $\cos(A \pm B)$

$$\cos(A \pm B) = \cos A \cos B \mp \sin A \sin B$$

---
$$\cos(A+B) = \cos A \cos B - \sin A \sin B$$
$$\cos(\theta+90^\circ) = \cos \theta \cos 90^\circ - \sin \theta \sin 90^\circ$$
$$= \cos \theta \cdot 0 - \sin \theta \cdot 1$$
$$= -\sin \theta$$
---
$$\cos(A-B) = \cos A \cos B + \sin A \sin B$$
$$\cos(\theta-90^\circ) = \cos \theta \cos 90^\circ + \sin \theta \sin 90^\circ$$
$$= \cos \theta \cdot 0 + \sin \theta \cdot 1$$
$$= \sin \theta$$










# Premise Set 19


## Conjunto de Premissas

- [[ps28]]


## [Green's Theorem](https://en.wikipedia.org/wiki/Green%27s_theorem)

$$
\oint_{C}\vec{F}\cdot d\mathbf r =
\oint_{C} P\,dx + Q\,dy
= \iint_{D} \Bigl(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Bigr)\,dA
$$
$$ \vec{F}(x,y)=\langle P(x,y),\;Q(x,y)\rangle $$


## [Stokes's Theorem](https://en.wikipedia.org/wiki/Stokes%27_theorem)

>$$\oint_{C=\partial S} \vec{F}\cdot d\vec{r}
  = \iint_{S} (\nabla \times \vec{F})\cdot d\vec{S}
  = \iint_{S} (\nabla \times \vec{F})\cdot \hat{n}\,dS$$
>$$\hat{n}\,dS
  = \left(\frac{\partial\vec r}{\partial u}\times\frac{\partial\vec r}{\partial v}\right)\,du\,dv$$
^stokesTheorem

![[ps28#^rot]]

![[ps19.svg|300]]


### For $z = f(x,y)$ (counter-clockwise $C$)
$$
\left(\frac{\partial\vec r}{\partial u}\times\frac{\partial\vec r}{\partial v}\right)\,du\,dv \quad = \quad(-f_x,\,-f_y,\,1)\,dx\,dy
$$
- This formula is obtained through the general parametric surface, as explained below, when $u=x$ and $v=y$


### General parametric surface $\vec r(u,v)$
$$
\hat{n}\,dS
  = \left(\frac{\partial\vec r}{\partial u}\times\frac{\partial\vec r}{\partial v}\right)\,du\,dv
$$
$$
\frac{\partial\vec r}{\partial u}\times\frac{\partial\vec r}{\partial v}
=
\begin{vmatrix}
  \mathbf i & \mathbf j & \mathbf k \\[6pt]
  \dfrac{\partial x}{\partial u} & \dfrac{\partial y}{\partial u} & \dfrac{\partial z}{\partial u} \\[6pt]
  \dfrac{\partial x}{\partial v} & \dfrac{\partial y}{\partial v} & \dfrac{\partial z}{\partial v}
\end{vmatrix}
$$
$$
\Bigl\langle
  \dfrac{\partial y}{\partial u}\,\dfrac{\partial z}{\partial v}
  - \dfrac{\partial z}{\partial u}\,\dfrac{\partial y}{\partial v},\;
  \dfrac{\partial z}{\partial u}\,\dfrac{\partial x}{\partial v}
  - \dfrac{\partial x}{\partial u}\,\dfrac{\partial z}{\partial v},\;
  \dfrac{\partial x}{\partial u}\,\dfrac{\partial y}{\partial v}
  - \dfrac{\partial y}{\partial u}\,\dfrac{\partial x}{\partial v}
\Bigr\rangle
$$


#### Example with polar coordinates 
$$
\hat{n}\,dS
= \Bigl(\frac{\partial\vec r}{\partial r}\times\frac{\partial\vec r}{\partial\theta}\Bigr)
$$

$$
\frac{\partial\vec r}{\partial r}\times\frac{\partial\vec r}{\partial\theta}
=
\begin{vmatrix}
  \mathbf i & \mathbf j & \mathbf k \\[6pt]
  \dfrac{\partial x}{\partial r} & \dfrac{\partial y}{\partial r} & \dfrac{\partial z}{\partial r} \\[6pt]
  \dfrac{\partial x}{\partial \theta} & \dfrac{\partial y}{\partial \theta} & \dfrac{\partial z}{\partial \theta}
\end{vmatrix}
$$
$$
\bigl\langle
\dfrac{\partial y}{\partial r}\,\dfrac{\partial z}{\partial \theta}
- \dfrac{\partial z}{\partial r}\,\dfrac{\partial y}{\partial \theta},\quad
\dfrac{\partial z}{\partial r}\,\dfrac{\partial x}{\partial \theta}
- \dfrac{\partial x}{\partial r}\,\dfrac{\partial z}{\partial \theta},\quad
\dfrac{\partial x}{\partial r}\,\dfrac{\partial y}{\partial \theta}
- \dfrac{\partial y}{\partial r}\,\dfrac{\partial x}{\partial \theta}
\bigr\rangle.
$$


## [Divergence Theorem](https://en.wikipedia.org/wiki/Divergence_theorem)

>$$ \\{{\rlap{\mspace{1mu}\boldsymbol{\bigcirc}}{\rlap{\int}{\;\int}}}}_{S=\partial V} \vec{F} \cdot \hat{n}\, dS
\;=\;
\iiint_{V} (\nabla \cdot \vec{F})\, dV$$
>$$ dV = dx\,dy\,dz \quad \text{Cartesian coordinates}$$
>$$ dV = r\,dr\,d\theta\,dz \quad \text{Cilindrical coordinates}$$
^divergenceTheorem

![[ps28#^div]]










# Premise Set 20


## EDO's Básicas










# Premise Set 21


## Conjunto de Premissas

- [[ps19]]
- [[ps28]]


## Green's Theorem as a special case of Stokes's Theorem

As said in [[ps19]]
$$
\oint_{C} \vec{F}\cdot d\vec{r}
  = \iint_{S} (\nabla \times \vec{F})\cdot d\vec{S}
  = \iint_{S} (\nabla \times \vec{F})\cdot \hat{n}\,dS
$$
$$
\vec{F}(x,y,z)=\langle P(x,y,z),\;Q(x,y,z),\;R(x,y,z)\rangle
$$
$$
\hat{n}\,dS
  = \left(\frac{\partial\vec r}{\partial u}\times\frac{\partial\vec r}{\partial v}\right)\,du\,dv
$$
![[ps28#^rot]]


A special case, when the Curve $C$ is on the plane, $z=0$ and $R(x,y,z) = 0$, making
$$ \vec{F}(x,y)=\langle P(x,y),\;Q(x,y)\rangle $$
$$
\nabla \times \vec{F} = \left(0,\,0,\, \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right)
$$
$$
\vec n = (0,0,1)
$$
$$
(\nabla \times \vec{F})\cdot \hat{n}\,dS
= \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) \, dS
= \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) \, dA
$$
$$\oint_{C}\vec{F}\cdot d\mathbf r =
\oint_{C} P\,dx + Q\,dy
= \iint_{D} \Bigl(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Bigr)\,dA$$










# Premise Set 22


## Introdução Ã  campos escalares e vetoriais


### Notation and Preliminaries

We denote by $\mathbb{R}^n$ the $n$-dimensional real coordinate space:

$$
\mathbb{R}^1 = \{(x)\mid x\in\mathbb{R}\},\quad
\mathbb{R}^2 = \{(x,y)\mid x,y\in\mathbb{R}\},\quad
\mathbb{R}^3 = \{(x,y,z)\mid x,y,z\in\mathbb{R}\}.
$$

Throughout, we use
- a lower-case letter $f$ to denote a scalar field, i.e.\ a function that assigns a real number to each point in space;
- an upper-case letter $F$ (or $\mathbf{F}$, $\vec{F}$) to denote a vector field, i.e.\ a function that assigns a vector to each point in space.


### 1D: Scalar vs. Vector Fields

On the real line $\mathbb{R}^1$, points are just $x\in\mathbb{R}$.


#### Scalar field
$$f(x):\mathbb{R}\to\mathbb{R}$$
Interpretation: "At position $x$, the temperature is $f(x)^\circ\mathrm{C}$."

Examples:
- Height of a wall as you walk along its base: if $x$ metres from one end, $f(x)$ metres is the wall's height.
- Water depth along a channel: $f(x)$ metres deep at position $x$.


#### Vector field

$$F(x):\mathbb{R}\to\mathbb{R}^1$$
In 1D every "vector" has only one component, so we rarely distinguish $F(x)$ from $f(x)$.
Interpretation: "At position $x$, the force on a test particle is $F(x)$ newtons to the right (or left if negative)."


### 2D: Adding a Second Dimension

Now points are $(x,y)\in\mathbb{R}^2$.


#### Scalar field

$$f(x,y):\mathbb{R}^2\to\mathbb{R}$$

Interpretation: "The temperature on a flat metal plate."

Examples:
- Elevation of a hill: at coordinate $(x,y)$, the altitude is $f(x,y)$.
- Pressure on a lake's surface: $f(x,y)$ kPa at $(x,y)$.

Visualization: level curves (contours) where $f(x,y)=C$.


#### Vector field

$$\mathbf{F}(x,y)=\langle P(x,y),\,Q(x,y)\rangle:\mathbb{R}^2\to\mathbb{R}^2$$
Interpretation: "Wind velocity at each point on a map."

Examples:
- Fluid flow in a shallow pond: $\mathbf{F}(x,y)$ gives the speed and direction of the current at $(x,y)$.
- Electric field near charged plates: $\mathbf{F}(x,y)$ points from positive to negative regions.

Visualization: arrow-plots showing an arrow at each $(x,y)$ with components $\langle P,Q\rangle$.


### 3D: The Physical World

Points now live in $\mathbb{R}^3$, $(x,y,z)\in\mathbb{R}^3$.


#### Scalar field

$$f(x,y,z):\mathbb{R}^3\to\mathbb{R}$$
Interpretation: "Temperature inside a room."

Examples:
- Density of air at each point $(x,y,z)$.
- Gravitational potential field: the potential energy per unit mass.


#### Vector field

$$
\mathbf{F}(x,y,z)=\langle P(x,y,z),\,Q(x,y,z),\,R(x,y,z)\rangle:\mathbb{R}^3\to\mathbb{R}^3.
$$

Interpretation: "Velocity of water in a river, wind in the atmosphere, or force fields."

Examples:
- Velocity field of a fluid: at each point, $\mathbf{F}(x,y,z)$ is the local fluid velocity vector.
- Electric field in space: vector at each $(x,y,z)$ giving magnitude and direction of force on a positive test charge.
- Magnetic field around a magnet: $\mathbf{F}(x,y,z)$ gives both strength and orientation.


### Why It Matters

**Scalar fields** model quantities that have magnitude only (temperature, pressure, density, potential).
**Vector fields** model quantities that have both magnitude and direction (velocity, force, electromagnetic fields).

These ideas form the foundation for
- Differential operators like gradient $\nabla f$ (turns a scalar field into a vector field),
- Divergence $\nabla\cdot F$ (measures "outflow" of a vector field),
- Curl $\nabla\times F$ (measures "rotation" of a vector field),

and ultimately the calculus of multivariable fields used in physics, engineering and geometry.










# Premise Set 23




f(x)
1. Inclinação da curva em um ponto
2. Reta tangente Ã  curva em um ponto
3. Vetor normal Ã  curva em um ponto

z = f(x,y)
1. Inclinação da curva em um ponto em relação Ã  x e y
2. Plano normal Ã  curva em um ponto
3. Vetor normal Ã  superfície em um ponto
4.










# Premise Set 24


## Conjunto de Premissas

- Relaciona-se com [[ps11]]


## Definição dos vetores

$$
\mathbf{a} = \vec a = (a_1, a_2, \ldots, a_n), \quad \mathbf{b} = \vec b = (b_1, b_2, \ldots, b_n)
$$


## [Dot product / Scalar product (Produto escalar)](https://en.wikipedia.org/wiki/Dot_product)

**Definition**
$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i $$
$$
\vec{a} \cdot \vec{b}  = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n
$$
**Geometrical interpretation**
$$\vec{a} \cdot \vec{b} = \|\vec{a}\| \, \|\vec{b}\| \cos \theta$$
$$\cos \theta = \frac{\vec{a} \cdot \vec{b}}{\|\vec{a}\| \, \|\vec{b}\|}$$
$$\theta = \arccos \left( \frac{\vec{a} \cdot \vec{b}}{\|\vec{a}\| \, \|\vec{b}\|} \right)$$
$$\theta = \theta_{ab} = \angle (\vec{a}, \vec{b}) = \angle AOB$$

**Numerical example**
$$\vec{a} = [1,\, 3,\,-5] \qquad \vec{b} = [4,\,-2,\,-1]$$
**Dot product $\left(\vec{a} \cdot \vec{b} = 3 \right)$**
$$\vec{a} \cdot \vec{b} =[1,\, 3,\,-5] \cdot [4,\,-2,\,-1] $$
$$= (1 \times 4) + (3 \times -2) + (-5 \times -1) $$
$$= 4 - 6 + 5 = 3$$
**Angle between vectors $\left( \theta = 83.7^\circ \right)$**
$$\vec{a} \cdot \vec{b} = 3$$
$$\|\vec{a}\| = \sqrt{1^2 + 3^2 + (-5)^2} = \sqrt{1 + 9 + 25} = \sqrt{35}$$
$$\|\vec{b}\| = \sqrt{4^2 + (-2)^2 + (-1)^2} = \sqrt{16 + 4 + 1} = \sqrt{21}$$
$$\theta = \arccos \left( \frac{\vec{a} \cdot \vec{b}}{\|\vec{a}\| \, \|\vec{b}\|} \right) = \arccos \left(\frac{3}{\sqrt{35} \, \sqrt{21}}\right)
$$
$$
\approx 1.4595 \, \text{rad}  \approx 1.4595 \times \frac{180}{\pi} \approx 83.7^\circ
$$


![[ps24-1.svg|300]]
![[ps24-2.svg|400]]


#### Círculo de Mohr ([[ps11]])
Isso é especialmente útil no círculo de Mohr para deformações, cada ponto no diagrama representa um estado bidimensional de deformação $(\varepsilon_x, \gamma_{xy})$ obtido por combinação de componentes normais e de cisalhamento. Ao girarmos o sistema de eixos reais em um ângulo $\theta$, esse mesmo ponto "varre" o círculo de Mohr por um ângulo $2\theta$. Em termos de produto escalar, se

$$
\varepsilon = (\varepsilon_x, \, \gamma_{xy}/2) \quad \text{e} \quad \varepsilon' = (\varepsilon'_x, \, \gamma'_{x'y'}/2)
$$

são os vetores de deformação nos eixos original e rotacionado, então
$$
\varepsilon \cdot \varepsilon' = \|\varepsilon\| \, \|\varepsilon'\| \cos \theta.
$$
Graficamente, esse produto projeta o ponto original sobre a direção do novo eixo, fornecendo diretamente as componentes normal ou de cisalhamento transformadas "“ sem necessidade de resolver sistemas de equações. Assim, basta conhecer a deformação em um único eixo e o ângulo de rotação para obter a deformação no eixo desejado, lendo-a como coordenada no círculo de Mohr. Esse método é especialmente poderoso para determinar deformações principais (quando o círculo "toca" o eixo das abscissas) e máximas cisalhantes (no ponto mais alto do círculo) de forma imediata.










# Premise Set 25


## Conjunto de Premissas


## Definição dos vetores
$$
\mathbf{a} = \vec a = (a_1, a_2, \ldots, a_n), \quad \mathbf{b} = \vec b = (b_1, b_2, \ldots, b_n)
$$


## [Cross product / Vector product (Produto vetorial)](https://en.wikipedia.org/wiki/Cross_product)

**Definição**
O produto vetorial de $\vec{a}$ por $\vec{b}$ é um vetor $\vec{c} = \vec{a} \times \vec{b}$ definido por

$$
\vec c =
\vec{a} \times \vec{b} =
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3
\end{vmatrix}
= (a_2 b_3 - a_3 b_2,\; a_3 b_1 - a_1 b_3,\; a_1 b_2 - a_2 b_1).
$$

**Interpretação geométrica**
$$||\vec{a} \times \vec{b}|| = ||\vec{a}||\,||\vec{b}|| \sin\theta$$
$$
|\sin \theta| = \frac{\| \mathbf{a} \times \mathbf{b} \|}{\| \mathbf{a} \| \, \| \mathbf{b} \|}
$$
$$
||\vec{a} \times \vec{b}|| = \sqrt{(a_2 b_3 - a_3 b_2)^2 + (a_3 b_1 - a_1 b_3)^2 + (a_1 b_2 - a_2 b_1)^2}
$$
$$ ||\vec{a}|| = \sqrt{a_1^2 + a_2^2 + a_3^2} $$
$$ ||\vec{b}|| = \sqrt{b_1^2 + b_2^2 + b_3^2}$$
$$\theta = \angle(\vec{a},\vec{b})$$

- A direção de $\vec{a} \times \vec{b}$ é perpendicular tanto a $\vec{a}$ quanto a $\vec{b}$, obedecendo Ã  regra da mão direita:
  - Se o polegar aponta em $\vec{a}$ e o indicador em $\vec{b}$, o dedo médio indica $\vec{a} \times \vec{b}$.
- A magnitude $||\vec{a} \times \vec{b}||$ é a área do paralelogramo construído sobre $\vec{a}$ e $\vec{b}$.

Propriedades principais

1. Anticomutatividade: $\vec{a} \times \vec{b} = -\,\vec{b} \times \vec{a}$.
2. Distributividade: $\vec{a} \times (\vec{b} + \vec{c}) = \vec{a} \times \vec{b} + \vec{a} \times \vec{c}$.
3. Produto com vetor paralelo: $\vec{a} \times \vec{a} = \vec{0}$.

Exemplo numérico

Tomemos $\vec{a} = [1,2,3]$, $\vec{b} = [4,5,6]$.

Então
$$
\vec{a} \times \vec{b} =
\begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
1 & 2 & 3 \\
4 & 5 & 6
\end{vmatrix}
=
\bigl(2\cdot6 - 3\cdot5,\;3\cdot4 - 1\cdot6,\;1\cdot5 - 2\cdot4\bigr)
=
(-3,\;6,\;-3).

$$
A magnitude é

$$
||\vec{a} \times \vec{b}|| = \sqrt{(-3)^2 + 6^2 + (-3)^2} = \sqrt{9 + 36 + 9} = \sqrt{54} = 3\sqrt{6},
$$

que corresponde Ã  área do paralelogramo formado por $\vec{a}$ e $\vec{b}$.

Aplicações em Mecânica

- Torque: dado um vetor posição $\vec{r}$ e uma força $\vec{F}$, $\tau = \vec{r} \times \vec{F}$ produz o momento de torção.
- Momento angular: $\vec{L} = \vec{r} \times \vec{p}$, com $p$ momento linear.
- Cálculo de normais em superfícies: para duas direções tangentes $\vec{u}, \vec{v}$, $\vec{u} \times \vec{v}$ é normal Ã  superfície.



![[ps25-1.svg|300]]

![[ps25-2.svg|300]]










# Premise Set 26


## Conjunto de Premissas


## [Determinante](https://en.wikipedia.org/wiki/Determinant)

>[!info] 2D
>The area of the parallelogram is the absolute value of the determinant of the matrix formed by the vectors representing the parallelogram's sides.
>![[ps26-2.svg|300]]
>$$B = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$$
> $$\det(B) = ad - bc$$



>[!info] 3D
>The volume of this parallelepiped is the absolute value of the determinant of the matrix formed by the columns constructed from the vectors r1, r2, and r3.
>![[ps26-3.svg |300]]
>$$A =
\begin{bmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{bmatrix}, \quad
r_1 = \begin{pmatrix} a \\ d \\ g \end{pmatrix}, \quad
r_2 = \begin{pmatrix} b \\ e \\ h \end{pmatrix}, \quad
r_3 = \begin{pmatrix} c \\ f \\ i \end{pmatrix}.$$
>$$
\det(A) = \det\begin{bmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{bmatrix}
= \begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
= aei + bfg + cdh - ceg - bdi - afh.
$$


### [Rule of Sarrus](https://en.wikipedia.org/wiki/Rule_of_Sarrus)
![[ps26-1.svg|300]]


### Laplace expansion
$$\det(A) = \sum_{j=1}^n (-1)^{i+j} a_{i,j} M_{i,j},$$
$M_{i,j}$ is the minor (the determinant of the matrix obtained by deleting row $i$ and column $j$).
$$
\begin{vmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{vmatrix}
= a
\begin{vmatrix}
e & f \\
h & i
\end{vmatrix}
- b
\begin{vmatrix}
d & f \\
g & i
\end{vmatrix}
+ c
\begin{vmatrix}
d & e \\
g & h
\end{vmatrix}.
$$










# Premise Set 27


## Conjunto de Premissas


## Multiplicação de matrizes










# Premise Set 28


## Conjunto de Premissas

- [[ps26]]


## Introdução ao campo gradiente

Seja
$$f: \mathbb{R}^3 \to \mathbb{R}, \quad f(x,y,z)$$
uma função escalar, ou seja, que a cada ponto $(x,y,z)$ associa um único valor numérico. Em física, costuma-se chamar $f$ de potencial, pois ele representa a energia potencial de uma partícula na posição $(x,y,z)$.

Quando interpretamos $f$ como um campo escalar, pensamos no conjunto de todos os valores de potencial distribuídos pelo espaço. Porém, é muitas vezes útil visualizar esse mesmo cenário como um campo vetorial, onde em cada ponto temos um vetor que indica a direção de maior crescimento de $f$ "” ou, invertendo o sinal, a direção de maior redução de energia.

Para construir esse campo vetorial, aplicamos o operador nabla ($\nabla$) a $f$:
$$
\nabla f(x,y,z) = \bigl(\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z}\bigr).
$$
O vetor $\nabla f$ chama-se gradiente de $f$. Ele aponta, em cada ponto, na direção de maior aumento de $f$ e tem magnitude proporcional Ã  taxa de variação local. Se o objetivo for deslocar-se no sentido de reduzir o potencial (p.ex., buscar o estado de menor energia), utiliza-se o vetor $-\nabla f$, que indica o caminho de descida mais acentuada.


## [Operador Nabla](https://en.wikipedia.org/wiki/Del) e notação para Teorema de Green, Teorema de Stokes e Teorema da divergência


### Diferentes notações para Nabla

$$\nabla = \left(\frac{\partial}{\partial x}, \, \frac{\partial}{\partial y}, \,\frac{\partial}{\partial z} \right) $$
$$= \left( \partial_x, \, \partial_y, \, \partial_z \right)$$
$$ =\frac{\partial}{\partial x} \,\vec i + \frac{\partial}{\partial y} \,\vec j+ \frac{\partial}{\partial z} \,\vec k $$
$$ = \mathbf{i} \, \partial_x + \mathbf{j} \, \partial_y + \mathbf{k} \, \partial_z $$
Obs.: Nabla não é um vetor no sentido convencional, é um operador, por isso existem algumas diferenças quando ele é usado nas aplicações abaixo.


### Nabla aplicado de diferentes formas

| Operação                                                       | Expressão                                        | Entrada | Saída   |
| -------------------------------------------------------------- | ------------------------------------------------ | ------- | ------- |
| [Gradiente](https://en.wikipedia.org/wiki/Gradient)            | $$ \mathrm{grad}\,f = \nabla f$$                 | Escalar | Vetor   |
| [Rotacional](https://en.wikipedia.org/wiki/Curl_(mathematics)) | $$ \mathrm{rot}\,\vec F = \nabla \times \vec F$$ | Vetor   | Vetor   |
| [Divergente](https://en.wikipedia.org/wiki/Divergence)         | $$ \mathrm{div}\,\vec F = \nabla \cdot \vec F$$  | Vetor   | Escalar |


#### Operador gradiente
>$$\text{grad} \, f =\nabla f= \left(\frac{\partial f}{\partial x}, \, \frac{\partial f}{\partial y}, \,\frac{\partial f}{\partial z} \right)$$
>$$\text{Aplicação do operador gradiente } (\text{grad} = \nabla)$$
>Não é a multiplicação de um vetor por um escalar. Da mesma forma que $\frac{d}{dx}$ é a aplicação do operador da derivada sobre um escalar e não uma multiplicação.
^grad


---


#### Operador divergente
>$$\vec{F}(x,y,z)=\langle P(x,y,z),\;Q(x,y,z),\;R(x,y,z)\rangle$$
>$$\text{div} \, \vec{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$
>$$\text{Aplicação do operador divergente} \left(\text{div = } \nabla\, \cdot \right)$$
>Observação: pode ser lembrado como o produto escalar entre vetores
^div


---


#### Operador rotacional

>$$\vec{F}(x,y,z)=\langle P(x,y,z),\;Q(x,y,z),\;R(x,y,z)\rangle$$
>$$\text{rot} \, \vec F = \nabla \times \vec{F}
= \text{"Det"}\begin{bmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\[6pt]
\frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\[6pt]
P & Q & R
\end{bmatrix}
= \left(
\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z},\;
\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x},\;
\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}
\right)$$
>$$\text{Aplicação do operador rotacional} \left(\text{rot = } \nabla\, \times \right)$$
>Observação: pode ser lembrado como "produto vetorial entre vetores"
>$\text{"Det"}$ está entre aspas pois "é apenas mnemônico, não um determinante usual de matriz de operadores".
^rot


Observação: Esse cálculo, apesar de assemelhar-se muito com o determinante dessa matriz, não é (Veja [[ps26]]), por isso o determinante está entre aspas. Isso é apenas uma maneira mais fácil de lembrar como fazer a conta

>[!attention] Atenção
> $$ \nabla f \ne \nabla \cdot f $$
> $$ \nabla f \ne \text{div} \, f$$
> $$\nabla \cdot f \quad \text{e} \quad \text{div} \, f = \nabla \cdot f $$
> Não estão definidos pois "$\cdot$" indica multiplicação de dois vetores, porém $f$ não é um vetor, é um escalar.
>
> **Veja**
> ![[Summary#^tabelaDeAlgebraLinear]]


## Conservatividade

Todo "campo gradiente" é, também um "campo conservativo", por isso essas duas maneiras de se referir Ã  um campo são usadas independentemente.
Um "campo gradiente" recebe esse nome pois vem da operação do gradiente
![[ps28#^grad]]

Um campo conservativo possui algumas propriedades interessantes


### Testes de conservatividade


#### Resumo
$$\text{Sendo } \vec F \in \mathbb R^2 \implies \vec F = \nabla f\iff \left(\operatorname{rot} \vec F \right)_z = \frac{\partial Q}{\partial x} -\frac{\partial P}{\partial y} = 0$$
$$\text{Sendo } \vec F \in \mathbb R^3 \implies \vec F = \nabla f\iff   \operatorname{rot} \vec F = (0,0,0)$$
\*Em domínio aberto simplesmente conexo


#### Explicação
Muitas vezes pode ser que você encontre um campo vetorial o qual não se sabe se ele é, também um "campo vetorial gradiente"/"campo vetorial conservativo". Para verificar isso, basta aplicar o operador rotacional Ã  esse campo. Se o resultado for $\vec 0$, o campo é conservativo.
$$\nabla \times F = \vec 0 \implies F = \nabla f.$$
Ou seja, sendo
![[ps28#^rot]]

Se
$$\vec F = \nabla f \implies \left(
\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z},\;
\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x},\;
\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}
\right) = \vec 0 = (0,0,0)$$ Caso o campo vetorial seja apenas em duas dimensões, sabemos que
$$R=0;\quad z=0 \implies \frac{\partial R}{\partial y} = \frac{\partial Q}{\partial z}=\frac{\partial P}{\partial z} = \frac{\partial R}{\partial x}=0$$
$$
\text{Portanto, seja } \vec F \in \mathbb R^2 \implies
\operatorname{rot}\vec F
= \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}
$$
$$\vec F = \nabla f \implies \frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x} \iff \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 0$$


## Contas parecidas


#### Rotacional de um campo vetorial gradiente
Se partirmos do pressuposto que o campo vetorial em questão é gradiente:
$$\vec F = \nabla f \implies\operatorname{rot}(\vec F) =\operatorname{rot}(\nabla f) = \nabla \times \nabla f = (\nabla \times \nabla) f = \vec{0}$$
Já que o produto vetorial de dois vetores iguai sempre é $\vec 0$.
$$(\nabla \times \nabla) = \vec 0 = (0,0,0)$$


#### Divergente de um campo vetorial gradiente
Se partirmos do pressuposto que o campo vetorial em questão é gradiente:
$$\vec F = \nabla f \implies \operatorname{div}(\vec F) =\operatorname{div}(\nabla f) = \nabla \cdot (\nabla f) = (\nabla \cdot \nabla) f = \nabla^2 f = \Delta f$$
Então o divergente de um campo vetorial gradiente é simplesmente o Laplaciano daquele campo
$$ \operatorname{div}(\vec F) =\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2} $$


#### Divergente de um campo rotacional
Se partirmos do pressuposto que o campo vetorial em questão é rotacional (sendo gradiente ou não):
$$\vec G = \operatorname{rot}\vec F \implies \operatorname{div} \left(\vec G \right) = \operatorname{div} \left(\operatorname{rot}\vec F\right) = \nabla \cdot \left(\nabla \times \vec F \right) = 0 $$

Write $F=(F_x,F_y,F_z)$. Then
$$
\nabla\times F=\Bigl(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z},\;\frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x},\;\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\Bigr).
$$

Taking the divergence,
$$
\nabla\cdot(\nabla\times F)
=\frac{\partial}{\partial x}\Bigl(\frac{\partial F_z}{\partial y}-\frac{\partial F_y}{\partial z}\Bigr)
+\frac{\partial}{\partial y}\Bigl(\frac{\partial F_x}{\partial z}-\frac{\partial F_z}{\partial x}\Bigr)
+\frac{\partial}{\partial z}\Bigl(\frac{\partial F_y}{\partial x}-\frac{\partial F_x}{\partial y}\Bigr).
$$

$$
=\frac{\partial^2 F_z}{\partial x\partial y}-\frac{\partial^2 F_y}{\partial x\partial z}
+\frac{\partial^2 F_x}{\partial y\partial z}-\frac{\partial^2 F_z}{\partial y\partial x}
+\frac{\partial^2 F_y}{\partial z\partial x}-\frac{\partial^2 F_x}{\partial z\partial y}.
$$
$$(1)\quad(2)\quad(3)\quad(4)\quad(5)\quad(6)$$

By Clairaut's theorem on equality of mixed partials,
$$
(1)=(4),\quad(2)=(5),\quad(3)=(6),
$$
so all terms cancel pairwise and
$$
\nabla\cdot(\nabla\times F)=0.
$$


## Laplacian operator

$$\nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2}$$
$$= \partial_x^2 + \partial_y^2 + \, \partial_z^2$$
$$\text{div}(\nabla) =\nabla \cdot \nabla = \nabla^2= \Delta$$

The Laplacian operator **is not**
$$
\nabla^2 = \left(\frac{\partial^2}{\partial x^2}, \, \frac{\partial^2}{\partial y^2}, \,\frac{\partial^2}{\partial z^2} \right) \quad \text{WRONG!}
$$
$$
\nabla^2 = \frac{\partial^2}{\partial x^2} \,\vec i + \frac{\partial^2}{\partial y^2} \,\vec j+ \frac{\partial^2}{\partial z^2} \,\vec k  \quad \text{WRONG!}
$$
$$
\nabla^2 = \mathbf{i} \, \partial_x^2 + \mathbf{j} \, \partial_y^2 + \mathbf{k} \, \partial_z^2  \quad \text{WRONG!}
$$


- https://en.wikipedia.org/wiki/Laplace_operator
- https://en.wikipedia.org/wiki/Harmonic_function










# Premise Set 29


## Conjunto de Premissas


## Resumo

- Calcular $\vec r_u$ e $\vec r_v$.
- Formar $\vec N = \vec r_u \times \vec r_v$.
- Escrever a equação do plano usando $\vec N$ e $P_0$.


---


## Como encontrar o vetor tangente Ã  um ponto de uma função

Sendo $\vec r(u,v) = (x,y,z)$, para encontrar o plano tangente Ã  um ponto dessa função podemos encontrar primeiro o vetor normal Ã  ele. O vetor normal $\vec N$ em um ponto $(x,y,z)$ qualquer na imagem da função $\vec r$ é $\vec r_u \times \vec r_v$ quando $\vec r(u,v) = (x,y,z)$.

$$\vec r(u,v) = (r_x(u,v), r_y(u,v), r_z(u,v))$$
$$\vec r(u,v) =(r_x, r_y, r_z) = (x,y,z)$$
---
$$\vec r_u = (r_{ux}, r_{uy}, r_{uz}), \quad \vec r_v = (r_{vx}, r_{vy}, r_{vz})$$
$$\vec r_u(u,v) = \left(\frac{\partial \, r_x}{\partial u} \,,\frac{\partial \, r_y}{\partial u} \,, \frac{\partial \, r_z}{\partial u}\right)$$
$$\vec r_v(u,v)= \left(\frac{\partial \, r_x}{\partial v} \,,\frac{\partial \, r_y}{\partial v} \,, \frac{\partial \, r_z}{\partial v}\right)$$
---
$$
  \vec N(u,v) =\vec r_u \times \vec r_v
  = \text{"det"}
  \begin{vmatrix}
    \mathbf{i} & \mathbf{j} & \mathbf{k} \\
    r_{ux} & r_{uy} & r_{uz} \\
    r_{vx} & r_{vy} & r_{vz}
  \end{vmatrix}
  $$

$$\vec N(u,v) = (r_{uy}r_{vz} - r_{uz}r_{vy},\; r_{uz}r_{vx} - r_{ux}r_{vz},\; r_{ux}r_{vy} - r_{uy}r_{vx})$$
---


## Encontrar o plano tangente Ã  um vetor

Um plano $\Pi$ que é tangente a um vetor $\vec{N}$ "” isto é, cujo vetor normal é $\vec{N}$ "” possui exatamente as mesmas "inclinações" de $\vec{N}$. Se

$$
\vec{N} = (a, b, c),
$$

então a equação geral de $\Pi$ pode ser escrita como

$$
\Pi: \; a x + b y + c z + d = 0
$$

em que $d$ é um offset (ou "termo independente") que desloca o plano ao longo do eixo normal.

Para fixar esse deslocamento, basta exigir que $\Pi$ passe por um ponto conhecido $P_0 = (x_0, y_0, z_0)$. Substituindo $P_0$ na equação do plano, obtemos

$$
a x_0 + b y_0 + c z_0 + d = 0
\quad\Longrightarrow\quad
d = -\bigl(a x_0 + b y_0 + c z_0\bigr).
$$

Logo, a equação explícita do plano que tem normal $\vec{N} = (a, b, c)$ e passa por $P_0$ é

$$
a x + b y + c z - \bigl(a x_0 + b y_0 + c z_0\bigr) = 0,
$$

ou de forma equivalente,

$$
a\,(x - x_0) + b\,(y - y_0) + c\,(z - z_0) = 0.
$$

Dessa maneira, $d$ aparece naturalmente como o negativo do produto interno entre $\vec{N}$ e o ponto $P_0$, garantindo que $\Pi$ tenha o mesmo vetor normal $\vec{N}$ e passe exatamente por $P_0$.










# Premise Set 30


## Conjunto de Premissas

- [[ps29]]
- [[ps25]]


## Fluxo e densidade de fluxo


### Fluxo

Fluxo é uma quantidade por tempo. Pode ser pensado em litros por minuto, por exemplo, se você tem uma caixa d'água com volume conhecido e sabe o fluxo/vazão de água que entra nela, você consegue calcular quanto tempo ela vai demorar para encher.

$$Q = \frac{\Delta V}{\Delta t} \quad \left[\frac{m^3}{s} ,\, \frac{L}{min}\right]$$
$$\text{Vazão volumétrica (Volume por tempo)}$$
---
$$\dot m = \frac{\Delta m}{\Delta t} \quad \left[kg/s\right]$$
$$\text{Vazão mássica (Massa por tempo)}$$


### Densidade de fluxo

$$
j_V = \frac{Q}{A} = \frac{1}{A}\,\frac{\Delta V}{\Delta t} \quad \left[\frac{m^3}{s\cdot m^2} = \frac{m}{s}\right]
$$
$$\text{Fluxo volumétrico superficial (volume por área e tempo)}$$
---
$$
j_m = \frac{\dot m}{A} = \frac{1}{A}\,\frac{\Delta m}{\Delta t} \quad \left[\frac{kg}{s\cdot m^2}\right]
$$
$$\text{Fluxo mássico superficial (massa por área e tempo)}$$



---


### [Surface integrals of vector fields](https://en.wikipedia.org/wiki/Surface_integral#Surface_integrals_of_vector_fields)

- [Flux as a surface integral](https://en.wikipedia.org/wiki/Flux#Flux_as_a_surface_integral)




Quando inicialmente pensamos em **fluxo**, geralmente assumimos que o é **fluxo unidirecional**, ou seja, se temos um cano de água horizontal e a água está indo da esquerda para direita, todo elemento infinitesimal de fluxo tem a mesma direção, para direita. Ou seja, o vetor normal que representa cada elemento de fluxo é
$$\hat{n}(x,y,z) = (1, 0, 0)$$
Quando inicialmente pensamos em **densidade de fluxo** assumimos outra coisa, que a superfície que vamos medir a densidade de fluxo é **simples** e **perpendicular** ao fluxo. No exemplo do cano de água imaginamos simplesmente uma área circular que está a 90° em relação ao cano.

Com isso já podemos refletir sobre algumas coisas: se mudarmos a orientação na superfície, o fluxo já muda, pois a **área** e o **vetor normal** mudaram.

![[ps30-4.png]]
$$ \Phi_F = \iint_S \vec{F} \cdot \hat{n} \cdot dS$$
Na imagem acima, o plano foi rotacionado $\theta$ em apenas um eixo, por isso o vetor unitário ao plano, corresponde Ã  simplesmente $\cos \theta$, mas implicitamente. Ou seja, sendo $\phi_i$ o ângulo entre o vetor normal e o eixo $i$:
$$\hat{n} = (\cos\phi_x,\cos\phi_y,\cos\phi_z)$$
Se a rotação é só em torno de $y$, então $\phi_x = \theta$, $\phi_y = 90^\circ$, $\phi_z = 90^\circ - \theta$, isto é
$$\hat{n} = (\cos \theta, 0, \sin \theta)$$
e como o fluxo na imagem só tem o componente X
$$\vec{F}(x,y,z) = (B(x,y,z), 0, 0)$$
$$\vec{F} \cdot \hat{n} =B\cos \theta $$

![[ps10#^cossenosDiretores]]


![[ps30-3.png|300]]



---

A fórmula mais simples para calcularmos o fluxo $\Phi_F$ é
$$\Phi_F =\iint_S \vec{F} \cdot d\vec{S}$$
Leia: O fluxo **Phi sub F** é a igual Ã  **integral dupla** na superfície orientada **S** do campo de vetores **F** em cada elemento infinitesimal da superfície orientada $d\vec{S}$

O que faz essa área infinitesimal ser orientada é um vetor normal unitário, ou seja
$$d\vec{S} =\hat{n} \cdot dS$$
Então podemos reescrever o fluxo como
$$ \Phi_F = \iint_S \vec{F} \cdot \hat{n} \cdot dS$$
Essa conta toda pode ser simplesmente entendida como "O fluxo em um superfície é a densidade de fluxo vezes a área dessa superfície" (tendo em vista que a densidade de fluxo, orientação da densidade de fluxo em relação Ã  área e a área em si não são iguais em todos os pontos do espaço).










---
$$\vec{F} = \text{vetor de densidade de fluxo}$$
$$\vec{F}(x,y,z) = (P(x,y,z), Q(x,y,z), R(x,y,z))$$
Função que retorna a **densidade** de fluxo $||\vec{F}||$ no ponto $P = (x,y,z)$ na direção  $(P,Q,R)$

---
$$\hat{n} = \text{vetor normal unitário Ã  superfície S no ponto P = (x,y,z)}$$
---
$$dS = \text{Elemento de superfície}$$
$$dS = \|\vec{r}_u \times \vec{r}_v\| \, du\, dv$$
$$\vec{r}_u \text{ e } \vec{r}_v \text{ são os comprimentos dos lados de dS, que é um paralelogramo}$$
Como explicado na [[ps25]], o módulo do produto vetorial de dois vetores retorna a área do paralelogramo formado por eles.

---
![[ps30#^flux]]

Pode se ver que em $\vec{n} \cdot dS$ já está "embutido" tanto a área quanto a direção, por isso é chamado também de "vetor-­área" orientado.


## Resumo

$$ \Phi_F =\iint_S \vec{F} \cdot d\vec{S} = \iint_S \vec{F} \cdot \hat{n} \cdot dS$$
$$\Phi_F = \iint_{(u,v)} \vec{F}(\vec{r}(u,v)) \cdot \left(\frac{\partial \vec{r}}{\partial u} \times \frac{\partial \vec{r}}{\partial v}\right) du\, dv$$
$$\vec{n} = \frac{\left(\vec{r}_u \times \vec{r}_v\right)}{\|\vec{r}_u \times \vec{r}_v\|} \quad dS = \|\vec{r}_u \times \vec{r}_v\| \, du\, dv$$
$$\hat{n} \cdot dS = \frac{\left(\frac{\partial \vec{r}}{\partial u} \times \frac{\partial \vec{r}}{\partial v}\right)}{\bigl\|\frac{\partial \vec{r}}{\partial u} \times \frac{\partial \vec{r}}{\partial v}\bigr\|}\,\bigl\|\tfrac{\partial \vec{r}}{\partial u} \times \tfrac{\partial \vec{r}}{\partial v}\bigr\| \, du\, dv= \left(\frac{\partial \vec{r}}{\partial u} \times \frac{\partial \vec{r}}{\partial v}\right) du\, dv$$
^flux

![[ps30-2.svg|500]]

![[ps30-1.svg]]










# Premise Set 31



- [[q119]] has a lot of examples


## [Function]()

- Arrow notation


## [Set-builder notation](https://en.wikipedia.org/wiki/Set-builder_notation)

- Pode ser entendido como "Ã‰ o conjunto de todos os valores que estão nesse conjunto do lado esquerdo que seguem as regras do lado direito"
- "tal que"

$$T = \{(x,y,z)\in \mathbb{R}^3 : z = 1,\; x^2 + y^2 \le 1\}$$


## [Implicit surface](https://en.wikipedia.org/wiki/Implicit_surface)

- Ã‰ chamada de implícita por não ser possível isolar uma variável de apenas um lado da equação
$$F(x,y,z) = 0$$
$$x + 2y - 3z + 1 = 0 \quad \text{The plane}$$
$$x^2 + y^2 + z^2 - 4 = 0 \quad \text{The sphere}$$


## [Parametric equatio](https://en.wikipedia.org/wiki/Parametric_equation)

$$x = a\cos(t)$$
$$y = a\sin(t)$$
$$\frac{x}{a} = \cos(t)$$
$$\frac{y}{a} = \sin(t)$$
$$\cos(t)^2 + \sin(t)^2 = 1$$
$$\bigl(\frac{x}{a}\bigr)^2 + \bigl(\frac{y}{a}\bigr)^2 = 1$$
$$x^2 + y^2 = a^2$$










# Premise Set 32


## [Matriz identidade](https://en.wikipedia.org/wiki/Identity_matrix) e [Delta de Kronecker](https://en.wikipedia.org/wiki/Kronecker_delta)

$I_1 = [1], I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \dots, I_n = \begin{bmatrix} 1 & 0 & 0 & \cdots & 0 \\ 0 & 1 & 0 & \cdots & 0 \\ 0 & 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & 0 & \cdots & 1 \end{bmatrix}$
$$I_{3} =
\begin{bmatrix}
\delta_{11} & \delta_{12} & \delta_{13} \\
\delta_{21} & \delta_{22} & \delta_{23} \\
\delta_{31} & \delta_{32} & \delta_{33}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1 \\
\end{bmatrix}$$
$$\delta_{ij} = 1 \text{ se }i = j \text{ e } \delta_{ij} = 0 \text{ se  } i \ne j$$
$$\text{Definição Delta de Kronecker}$$










# Premise Set 33


## [Rotation Matrix](https://en.wikipedia.org/wiki/Rotation_matrix)

$$R(\alpha) = \begin{pmatrix} \cos(\alpha) & -\sin(\alpha) \\ \sin(\alpha) & \cos(\alpha) \end{pmatrix}$$
$$R(90^{\circ}) = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$
$$R(90^{\circ}) = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$
---
$$\vec{v}_{1}=(v_{1x}, v_{1y}) \quad \vec{v}_{2}=(v_{2x}, v_{2y})$$

$$\vec{v}_{2} = \vec{v}_{1} + (\circlearrowleft 90°)= R(90^{\circ})v_1=(-\vec{v}_{1y}, \vec{v}_{1x})$$
^rotacao90graus

$$\begin{pmatrix} v_{2x} \\ v_{2y} \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} v_{1x} \\ v_{1y} \end{pmatrix}$$
$$\begin{pmatrix} v_{2x} \\ v_{2y} \end{pmatrix} = \begin{pmatrix} (0 \cdot v_{1x}) + (-1 \cdot v_{1y}) \\ (1 \cdot v_{1x}) + (0 \cdot v_{1y}) \end{pmatrix} = \begin{pmatrix} -v_{1y} \\ v_{1x} \end{pmatrix}$$










# Premise Set 34


## Fórmula Mestra para decorar

>$$Valor_{normal} = \text{Média} + (...) \cos(2\theta) + (...) \sin(2\theta)$$
>$$\sigma_{\theta} = \left(\frac{\sigma_{xx} + \sigma_{yy}}{2}\right) + \left(\frac{\sigma_{xx} - \sigma_{yy}}{2}\right) \cos(2\theta) + \tau_{xy} \sin(2\theta)$$
>Para Achar Cisalhamento $(\tau_{ij})$ ou $(\frac{\gamma_{ij}}{2})$:
>1. Esqueça a Média.
>2. Troque $\cos(2\theta) \rightarrow - \sin(2\theta)$.
>3. Troque $\sin(2\theta) \rightarrow \cos(2\theta)$.
>
>Para Achar Deformação $(\varepsilon)$:
>- Troque $\sigma$ por $\varepsilon$.
>- Troque $\tau_{xy}$ por $\frac{\gamma_{xy}}{2}$.
^formulaMestraRotacao

A componente de cisalhamento (seja de tensão ou deformação) é **igual Ã ** metade da derivada da componente normal em relação ao **ângulo de rotação do plano**, Î¸


## Resumos fórmulas de rotação (tensão e deformação)

**Geral**
$$T_{ii} = \frac{T_{xx} + T_{yy}}{2} + \frac{T_{xx} - T_{yy}}{2}\cos(2\theta) + T_{xy}\sin(2\theta)$$
$$T_{ij} = \frac{1}{2}\frac{dT_{ii}}{d\theta} = -\frac{T_{xx} - T_{yy}}{2}\sin(2\theta) + T_{xy}\cos(2\theta)$$
**Tensão normal**
$$\sigma_{ii} = \frac{\sigma_{xx} + \sigma_{yy}}{2} + \frac{\sigma_{xx} - \sigma_{yy}}{2}\cos(2\theta) + \tau_{xy}\sin(2\theta)$$
$$= \sigma_{xx} \cos^2(\theta) + \sigma_{yy} \sin^2(\theta) + 2\tau_{xy} \sin(\theta) \cos(\theta)$$
**Tensão de cisalhamento**
$$\tau_{ij} = \frac{1}{2}\frac{d\sigma_{ii}}{d\theta} = -\frac{\sigma_{xx} - \sigma_{yy}}{2}\sin(2\theta) + \tau_{xy}\cos(2\theta)$$
$$= -(\sigma_{xx} - \sigma_{yy}) \sin(\theta) \cos(\theta) + \tau_{xy}(\cos^2(\theta) - \sin^2(\theta))$$
**Deformação normal**
$$\varepsilon_{ii} = \frac{\varepsilon_{xx} + \varepsilon_{yy}}{2} + \frac{\varepsilon_{xx} - \varepsilon_{yy}}{2}\cos(2\theta) + \left(\frac{\gamma_{xy}}{2}\right)\sin(2\theta)$$
$$= \varepsilon_{xx} \cos^2(\theta) + \varepsilon_{yy} \sin^2(\theta) + \gamma_{xy} \sin(\theta) \cos(\theta)$$
**Deformação de cisalhamento**
$$\varepsilon_{ij} = \frac{1}{2}\frac{d\varepsilon_{ii}}{d\theta} =\frac{\gamma_{ij}}{2} = -\frac{\varepsilon_{xx} - \varepsilon_{yy}}{2}\sin(2\theta) + \frac{\gamma_{xy}}{2}\cos(2\theta)$$
$$= -(\varepsilon_{xx} - \varepsilon_{yy}) \sin(\theta) \cos(\theta) + \frac{\gamma_{xy}}{2}(\cos^2(\theta) - \sin^2(\theta))$$






Acima estão todas as fórmula e algumas variações delas. Porém, para decorar segue a dica abaixo:










# Premise Set 35



- https://en.wikipedia.org/wiki/Yield_(engineering)


## [Von Mises](https://en.wikipedia.org/wiki/Von_Mises_yield_criterion)

| State of stress        | Boundary conditions                                                         | von Mises equations                                                                                                                                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| General                | $$\text{No restrictions}$$                                                  | $$\sigma_v = \sqrt{\frac{1}{2}\left[\left(\sigma_{11} - \sigma_{22}\right)^2 + \left(\sigma_{22} - \sigma_{33}\right)^2 + \left(\sigma_{33} - \sigma_{11}\right)^2\right] + 3\left(\sigma_{12}^2 + \sigma_{23}^2 + \sigma_{31}^2\right)}$$ |
| Principal stresses     | $$\sigma_{12} = \sigma_{31} = \sigma_{23} = 0$$                             | $$\sigma_v = \sqrt{\frac{1}{2}\left[\left(\sigma_1 - \sigma_2\right)^2 + \left(\sigma_2 - \sigma_3\right)^2 + \left(\sigma_3 - \sigma_1\right)^2\right]}$$                                                                                 |
| General plane stress   | $$\sigma_3 = 0 \quad \sigma_{31} = \sigma_{23} = 0$$                        | $$\sigma_v = \sqrt{\sigma_{11}^2 - \sigma_{11}\sigma_{22} + \sigma_{22}^2 + 3\sigma_{12}^2}$$                                                                                                                                              |
| Principal plane stress | $$\sigma_3 = 0$$$$ \sigma_{12} = \sigma_{31} = \sigma_{23} = 0$$            | $$\sigma_v = \sqrt{\sigma_1^2 + \sigma_2^2 - \sigma_1\sigma_2}$$                                                                                                                                                                           |
| Pure shear             | $$\sigma_1 = \sigma_2 = \sigma_3 = 0$$$$\sigma_{31} = \sigma_{23} = 0$$     | $$\sigma_v = \sqrt{3}\sigma_{12}$$                                                                                                                                                                                                         |
| Uniaxial               | $$\sigma_2 = \sigma_3 = 0$$$$ \sigma_{12} = \sigma_{31} = \sigma_{23} = 0$$ | $$\sigma_v = \sigma_1$$                                                                                                                                                                                                                    |


## [Tresca](https://en.wikipedia.org/wiki/Yield_surface#Tresca_yield_surface)

$$\frac{1}{2}\max(|\sigma_1 - \sigma_2|, |\sigma_2 - \sigma_3|, |\sigma_3 - \sigma_1|) = S_{sy} = \frac{1}{2}S_y$$
$$S_{sy} \text{ is the yield strength in shear}$$
$$S_y \text{ is the tensile yield}$$










# Premise Set 36


## Fórmulas para Mecânica dos Fluidos

<snippet id="eqMecFlu1">
$$Q_{1 \to 2} = m \cdot c_p \cdot (T_2 - T_1) = [J] = [kg] \cdot \left[\frac{J}{kg \cdot K}\right] \cdot [K]$$
</snippet>


Usado na [](Questions.md#question-131)



<snippet id="vazaoMassica">
$$\dot{m} = \frac{VA}{v} = \rho VA$$
</snippet>

<snippet id="vazaoMassicaConstante">
$$\rho V_i A_i = \rho V_e A_e$$

$$V_e = V_i \frac{A_i}{A_e} = V_i \frac{\pi D_i^2/4}{\pi D_e^2/4} = V_i \left(\frac{D_i}{D_e}\right)^2$$
</snippet>

Usado na [](Questions.md#question-132)


