# draft

不要看这个图，看下一个

```mermaid
graph TB
DC --Ag--> CD4+[(CD4+)]
DC --Ag--> CD8+[(CD8+)]
%% Th1
DC --> IL-12([IL-12]) --> Th1[Th1] --> IL-12
CD4+ --> Th1 --> l([CD40L,etc.]) --> Mϕ
Mϕ --> IL-12

Th1 --> IL-2([IL-2])
IL-2 --> CD4+
IL-2 --> CD8+
IL-2 -.-> Th2
IL-2 --> Mϕ
IL-2 --> NK

CD4+ --> IFN([IFN-γ]) --> DC
Th1 --> IFN --> Th1
IFN --> Mϕ
IFN --> NK
IFN --Ab--> B[B cell]
IFN -.-> Th2[Th2]

Th1 --> TNFa([TNF-α]) --> neutrophil

CD4+ --> co([IL-3,GM-CSF]) --monocyte differentiation--> Mϕ
Th1 --> co --recruit--> Mϕ

%% Th2
CD4+ --> Th2 
Th2 --> co
Th2 --> IL-4([IL-4]) --> Th2
Th2 --> IL-10([IL-10]) -.-> Th1
IL-4 -.-> Th1
IL-4 --> B
IL-4 --> hypersensitivity
IL-13 --> hypersensitivity

Th2 --> IL-13([IL-13]) --> B

%% Th17
CD4+ --> Th17[Th17] --> IL-17([IL-17]) --> ic[inflammatory<br/>cytokines]

%% Tc
CD8+ --> CTL[CTL] --> IL-2 --> CTL --> TNFa

classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,Th2,Th17,CTL subcell
```

> 箭头指向谁，就是促进其增殖、活性，指向Th1这种就是原始细胞分化成它。虚线是抑制！！
>
> 太丑了，可以看源码。。真的就没法对细胞因子和细胞分个类，放容器里面嘛。。

> IL-2 ：刺激Tc、 Th分化，增强NK、 MФ活性、诱导LAK和TIL的抗瘤活性。
> IFN-γ：促进MHCⅡ/Ⅰ表达、活化MФ功能、 NK杀瘤和抗病毒。
> TNF-β：炎症作用、杀伤靶细胞、抗病毒（LT）、激活中性粒、 MФ。  
>
> GM-CSF、 MCF  

a simple version with only cells

```mermaid
graph TB
%%linkStyle 1 stroke:#ff3,stroke-width:4px,color:red
DC --Ag--> CD4+[(CD4+)]
DC --Ag--> CD8+[(CD8+)]
%% Th1, IL-12
DC --IL-12--> Th1[Th1]
CD4+ ==> Th1 --activating ligand--> Mϕ --IL-12--> Th1
%% IL-2
Th1 --IL-2--> CD4+
Th1 --IL-2--> CD8+
Th1 -.IL-2.-> Th2
Th1 --IL-2--> Mϕ
Th1 --IL-2--> NK
%% IFN
Th1 --IFN-γ--> DC
Th1 --IFN-γ--> Th1
Th1 --IFN-γ--> Mϕ
Th1 --IFN-γ--> NK
Th1 --IFN-γ,Ab--> B[B cell]
Th1 -.IFN-γ.-> Th2[Th2]
%% IL-3, CSF
CD4+ --IL-3/GM-CSF<br/>monocyte differentiation--> Mϕ
Th1 --IL-3/GM-CSF<br/>recruit--> Mϕ
%% Th2, IL-4/10/13
CD4+ ==> Th2 --IL-3/GM-CSF--> Mϕ
Th2 --IL-4--> Th2
Th2 -.IL-4.-> Th1
Th2 -.IL-10.-> Th1
Th2 --IL-4--> B
Th2 --IL-4--> hypersensitivity
Th2 --IL-13--> hypersensitivity

Th2 --> IL-13([IL-13]) --> B

%% Th17
CD4+ ==> Th17[Th17] --IL-17--> ic[inflammatory<br/>cytokines]

%% Tc
CD8+ ==> CTL[CTL] --IL-2--> CTL --> TNFa
Th1 --TNF-α--> neutrophil

classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,Th2,Th17,CTL subcell
```

> 粗线：分化为；细线：促进





#### Relationship between cells

```mermaid
graph TD
%%linkStyle 1 stroke:#ff3,stroke-width:4px,color:red
DC --Ag presenting--> CD4+[(CD4+)]
DC --Ag presenting--> CD8+[(CD8+)]
%% Th1, DC
DC --IL-12--> Th1[Th1]
Th1 --IFN-γ--> DC
%% CD diff
CD4+ ==> Th1 --IL-2 positive<br/>feedback--> CD4+
CD4+ ==> Th2
CD8+ ==> CTL[CTL] --IL-2--> CTL
%% Th Tc
Th1 --IL-2--> CTL
Th1 --IL-2--> Th2
Th1 -.IFN-γ.-> Th2[Th2]
Th2 -.IL-4.-> Th1
Th2 -.IL-10.-> Th1

classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,Th2,Th17,CTL subcell
```

- DC is the initial activator, IL-12 to induce Th1
- Th1 positive feedback, strengthen DC and itself
- Th1 and Th2, both from Th0, inhibiting each other?
- CTL is activated by IL-2 (self, Th1)

#### Th1 downstream

```mermaid
graph TD
CD4+ ==> Th1 --> l([CD40L,etc.]) --activation--> Mϕ --IL-12--> Th1
CD4+ --> co([IL-3,GM-CSF]) --monocyte<br/>differentiation--> Mϕ
Th1 --> co --recruit--> Mϕ --enhanced<br/>presentation--> CD4+

Th1 --> IL-2([IL-2])
IL-2 --> CTL
IL-2 --> Mϕ
IL-2 --> NK
IL-2 --> Th2

CD4+ --> IFN([IFN-γ])
Th1 --> IFN --> Th1
IFN --> Mϕ
IFN --> NK
IFN --Ab--> B[B cell]
IFN -.-> Th2[Th2]

Th1 --> TNFa([TNF-α]) --> neutrophil
```

- activate each other with macrophage



```mermaid
graph TB
%% IL-3, CSF
CD4+ --IL-3/GM-CSF<br/>monocyte differentiation--> Mϕ
Th1 --IL-3/GM-CSF<br/>recruit--> Mϕ

CD4+ ==> Th1 --activating ligand--> Mϕ --IL-12--> Th1
%% Th2, IL-4/10/13
CD4+ ==> Th2 --IL-3/GM-CSF--> Mϕ
Th2 --IL-4--> Th2
Th2 -.IL-4.-> Th1
Th2 -.IL-10.-> Th1
Th2 --IL-4--> B
Th2 --IL-4--> hypersensitivity
Th2 --IL-13--> hypersensitivity

Th2 --> IL-13([IL-13]) --> B

%% Th17
CD4+ ==> Th17[Th17] --IL-17--> ic[inflammatory<br/>cytokines]

%% Tc
CD8+ ==> CTL[CTL] --IL-2--> CTL --> TNFa


classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,Th2,Th17,CTL subcell
```








