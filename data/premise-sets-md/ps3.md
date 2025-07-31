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

- Resultado chave — simetria do tensor de tensões

Em equilíbrio estático o tensor de tensões é simétrico:

$$
\sigma_{ij} = \sigma_{ji}.
$$

Essa simetria reduz de 9 para 6 o número de componentes independentes do tensor de tensões, simplificando significativamente as análises em Mecânica dos Sólidos.
