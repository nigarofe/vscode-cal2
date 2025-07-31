## Conjunto de Premissas %% fold %%
- [[ps32]]

# Nome das variáveis, tensores e matrizes mais utilizados em Mecânica dos sólidos

| Nome utilizado                           | Símbolo       | Nome do símbolo                             |
| ---------------------------------------- | ------------- | ------------------------------------------- |
| Tensão normal                            | $\sigma$      | sigma (σίγμα)                               |
| Tensão de cisalhamento                   | $\tau$        | tau (ταυ)                                   |
| Deformação normal                        | $\varepsilon$ | epsilon (έψιλον)                            |
| Deformação de cisalhamento               | $\gamma$      | gamma (γάμμα)                               |
| Coeficiente de Poisson                   | $\nu$         | nu (νυ)                                     |
| Módulo de cisalhamento                   | $\mu$         | mu (μυ)                                     |
| Parâmetro de Lamé                        | $\lambda$     | lambda (λάμβδα)                             |
| Densidade                                | $\rho$        | rho (ρώ)                                    |
| Delta de Kronecker                       | $\delta_{ij}$ | delta (δέλτα)                               |
| Coeficiente de dilatação térmica         | $\alpha$      | alpha (άλφα)                                |
| Ângulo                                   | $\theta$      | theta (θήτα)                                |
| Módulo de elasticidade (módulo de Young) | $E$           | – (letra latina “E”, sem equivalente grego) |
|                                          |               |                                             |
$$
\text{Tensor de tensões } [\sigma]  =
\begin{bmatrix}
\sigma_{xx} & \tau_{xy} & \tau_{xz} \\
\tau_{yx} & \sigma_{yy} & \tau_{yz} \\
\tau_{zx} & \tau_{zy} & \sigma_{zz}
\end{bmatrix}
$$
Seguindo a convenção de sinais mais comum em Mecânica dos Sólidos — isto é,  
_normal_ positiva quando o vetor‑tração aponta para fora da face positiva do eixo,  
e _cisalhante_ positiva quando, na face positiva **i**, o vetor está na direção positiva **j**

Em mecânica dos sólidos é hábito distinguir na escrita os $\textbf{esforços normais}$ (que atuam $\textbf{perpendicularmente}$ à face) dos $\textbf{esforços de cisalhamento}$ (que atuam $\textbf{tangencialmente}$ à face), usando:
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
