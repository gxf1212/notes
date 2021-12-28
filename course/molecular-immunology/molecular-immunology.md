# Molecular Immunology notes

Due to the absence of appropriate English online courses that match our course's syllabus, I have to write a note on my own. All the content is based on the newest slides in 2021 and the Chinese textbook. I wound not try to write everything in English because the nouns must be 太难顶了... (I'm reading Chinese materials!)  but from chapter 3 most content is in English. For important terms in English, I have to remark them in Chinese. So it's a bit challenging for general readers, while interesting for those who would love to dive into immunology research in the future. Due to the limited knowledge, there must be errors and omissions. Some of the terms are poorly translated or guessed due to the time limit. The author kindly asks the respected readers for granted criticisms and instructions.

The main reference materials include the slides (not available, but you can watch) our [Medicinal Immunology MOOC](https://www.icourse163.org/learn/XJTU-1206143814?tid=1464315463#/learn/content) in XJTU. I'm sure that the videos are great resources for students in medicine and life sciences. The first part (chapters 1 to 8) is about the components in the immune system, while the second part (the rest) tries to understand it as a whole and describes the processes. That's also what my notes follow. Hope you will like it. I recommend [a MOOC from Drew University](https://www.bilibili.com/video/BV1ui4y1Z75d/) with subtitles, which also covers a lot of details in immunology. You should go to that page because there are **several textbooks** shared in pdf version (see the top comment). BTW, welcome to subscribe [my Bilibili channel](https://space.bilibili.com/441196634) for educational videos from YouTube with Chinese subtitles!

The quoted areas are less-important comments or end-of-chapter questions.

# Chapter 1 Introduction 

绪论

## History

- 天花病毒，种痘，保留毒株
- milestones...poco
  - Louis Pasteur made the first vaccines
  - discovery of blood types (lectins)
  - discovery of MHC
- modern immunology since 1970s
  - molecular level
  - immunological methods
  - safe/dangerous signals
  - therapies

## Basic functions

1. immune defense (**免疫防御**): get rid of foreign pathogens and tissues
2. immune surveillance (**免疫监视**): eliminate abnormal/non-self cells, like tumor cells
3. immune homeostasis (**免疫自稳**): eliminate aging/dead cells, 维持内环境稳定

## Operation (运转)

分为两部分

- 固有免疫（innate immune）：与生俱来的，第一道防线，高等和低等生物都有

  - 组成：免疫屏障，固有免疫细胞，免疫分子 (see [chapter 9](#Chapter-9-Antigen-Presenting))
  - 特点：无特异性，无记忆性

- 特异性免疫（adaptive immune）：高等生物通过接触病原体建立起来的，针对特定病原体的免疫防御能力

  - 组成

    |          | 谁来介导 | 谁发挥效应            |
    | -------- | -------- | --------------------- |
    | 体液免疫 | B cell   | antibody              |
    | 细胞免疫 | T cell   | activated lymphocytes |

  - 特点：有特异性和记忆性，作用强大而持久

## good or bad?

- good 
  - defend pathogens, eliminate cancer cells, clear aging/dead cells
  
    > coresponding to the functions
  
- bad
  - too weak: cannot do above, continuous infection
  - too strong
    - allergy
    - auto-immunity (自身免疫)
    - related tissue damage (组织损伤)
    - transplant rejection (移植排斥)

# Chapter 2 Basics and Trends 

免疫学基础和发展趋势

## Basic problem: how we respond to danger

### Research

- Development, differentiation of immune cells, and regulation
- recognition mechanism, processes of immune response
- interplay with other systems, relationship with various diseases

### Applications

- diagnosis, treatment, prevention of diseases
- biotechnology, etc

## Clone selection theory

- Every immune cell expresses a receptor for **a single antigen**. Our body creates a library of immune cells, i.e. receptors recognizing all antigens.
- When an antigen binds to its specific receptor, that cell is activated to proliferate itself. All daughter cells expressing the same receptor are called a clone.
- If the receptor binds to its antigen during the development of cells, the clone is aborted, which makes immune tolerance.

## Components

```mermaid
graph TB
top[immune organs] --development and maturation--> 1[central immune organs]
top[immune organs] --settlement and response--> 2[periphery immune organs]
1 --> bm[bone marrow]
1 --> thymus
2 --> spleen
2 --> ln[lymph nodes]
```

### Central (primary) immune organs

- 骨髓：含造血干细胞，是所有血细胞的来源
  - 为发育提供了环境：生长因子、基质细胞等
  - 分为粒系/髓系（myeloid）和淋巴系（lymphatic）
- 胸腺：T细胞分化发育的场所。成年后退化

### Periphery (secondary) immune organs

- 外周免疫器官：脾脏、淋巴结
- 外周免疫组织：黏膜淋巴组织、阑尾、扁桃体
- 其他组织中的免疫细胞

#### spleen

- 最大的免疫器官（黏膜：你礼貌吗？）
- 淋巴细胞定居、发挥功能的场所


> 红髓：巨噬细胞；白髓：T细胞
>
> 其他功能：调节血量、过滤血液（拦下一些抗原，便于激活免疫）

#### lymphatic system

##### structure and function

- 淋巴结由淋巴管相连，构成遍布全身的网络
- 沿血管分布，有深有浅，是免疫系统的“哨所”
  - 淋巴液和血浆成分相似，可能交换
- 淋巴细胞定居、发挥免疫应答的场所
  - 脾脏漏掉的抗原被收集，便于激活免疫


<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/1-lymphnode.jpg" alt="1-lymphnode" style="zoom:50%;" /><img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/1-lymphnode2.jpg" alt="1-lymphnode2" style="zoom:50%;" />

具体结构

- 两套循环：淋巴循环和血液循环
- 两个区域
  - 浅层：B细胞
    - 浅皮质区：初级滤泡，无免疫应答
    - 深皮质区：次级滤泡，发生免疫应答时产生生发中心
  - 深层：T细胞

##### lymphocyte homing and recirculation

- 淋巴细胞归巢：某些亚群的淋巴细胞迁移或定居在某些特定区域

  淋巴细胞上的归巢受体和血管内皮细胞上的地址素结合，诱导淋巴细胞穿过血管壁

- 淋巴细胞再循环：在两套系统间往复循环的过程

  - 在淋巴管中汇集，经胸导管进入血液
  - 在淋巴结中穿入、穿出血管内皮

- 意义：有利于免疫细胞的更新（增殖），调整淋巴细胞在全身的分布，便于在病原体入侵时动员

> questions
>
> - 你知道白血病和淋巴瘤的区别吗？  
> - 胸腺退化是否会引起免疫功能低下？  
> - position of these organs?
>
> 思考与小结
> - 克隆选择学说的要点是什么？
> - 免疫系统的基本功能是什么？
> - 免疫系统是怎样工作的？
> - 免疫系统是怎样构成的？
> - 什么是淋巴细胞归巢与再循环？  



# Chapter 3 Antigen 

抗原

## Characteristics

Antigens are substances that can 

- induce the generation of antibody, primed lymphocytes (致敏淋巴细胞).
- be recognized by the immune system and elicit an immune response.

### Concepts

Corresponding to the above two points,

- antigenicity (抗原性): the ability to specifically combine with the final products of an immune response (i.e. antibodies or receptors on sensitized immune cells)
- immunogenicity (免疫原性): the ability to induce immune responses

Thus, antigens are categorized into

- hapten: only antigenicity, no immunogenicity
- complete antigen: both

Another thing is the so-called "carrier effect": when a hapten is attached to a larger molecule (e.g. a protein), it can induce a secondary, stronger immune response, if the animal has been primed (致敏) with the same hapten conjugated to another carrier protein.

### Immunogenicity: influencing factors

#### antigen

##### foreignness (异物性)

i.e. the difference between antigen and "self"

What is "self"? If a substance comes into contact during the embryonic period or the development of lymphocytes, it is recognized as "self".

e.g. antigens carried from mother, HIV, etc.

categories:

- heterogenetic (**异种**) antigen: come from other species

  > food, microbes and their products, heterogenetic serum

- allogeneic (**同种异体**) antigen: other individuals

  > blood group antigen, transplant antigen, etc.

- autogeneic (自体) antigen: from yourself

  > tissue-specific antigen, denatured protein, etc.

##### chemical properties

- molecular weight

  - **bigger** (\> 10kD) is better

- chemical structure

  the more **complex**, the stronger immunogenicity is

   1. protein > polysaccharides > nucleic acid > lipids
   2. more aromatic residues
   3. complex 2nd/3rd structure

- physical properties

  - granule > soluble

    **stay**s longer, harder to decompose

- epitope accessibility

  - on the **surface** → stronger

#### host

age, gender, genetic factor, healthy state

#### route of entry

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/3-skin.png" alt="3-skin" style="zoom:25%;" />

皮内 > 皮下 > 肌肉 > 静脉 > 口腔

口服抗原易导致免疫耐受

## Specificity

The nature of antigen specificity is, the specificity of an immune response.

e.g. 抗间氨基苯磺酸的抗体和邻位、对位、其他酸的反应弱或没有

- an antigen only activates lymphocytes specific to recognize it

- - MHC, BCR or TCR restricted

- products of an immune response only react with that specific antigen

cross-reaction (交叉反应): an antibody to a specific antigen can react with other antigens

e.g. 给人种牛痘

nature: similar epitope

### Epitope

表位或抗原决定簇 (antigen determinant): groups/structures that determine the specificity of antigens. 

Also, they are the basic unit to specifically recognize TCR/BCR/antibody.

| epitope type                 | linear epitope <br />线性表位 | conformational epitope <br />构象表位 |
| ---------------------------- | :---------------------------- | ------------------------------------- |
| sequence                     | sequential                    | separated                             |
| 3D structure                 | close                         | close                                 |
| after denaturation/digestion | remains                       | distroyed                             |
| recognized by                | TCR, BCR                      | mainly BCR                            |

构象表位：由氨基酸序列不连续，但在空间上相互接近、形成特定构象的几个氨基酸构成的表位。

| epitope              | T cell epitope                                               | B cell epitope                                               |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| receptor             | TCR                                                          | BCR                                                          |
| MHC involved?        | yes                                                          | no                                                           |
| antigen presentation | needed                                                       | no need                                                      |
| composed of          | linear short peptide                                         | natural polypeptide<br />(lipo)polysaccharide<br />organic compounds |
| size                 | CD8<sup>+</sup> T cell: 5\~12 AA<br />CD4<sup>+</sup> T cell: 12\~17 AA | 5\~15 AA or 5\~7 <br />oligosaccharide or nt                   |
| type                 | linear                                                       | linear or conformational                                     |
| position             | any                                                          | surface                                                      |

> natural: part of a macromolecule?

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/3-tb.png" alt="3-tb" style="zoom:45%;" />

## Categories

### Dependence on Th cell

Thymus-independent/dependent antigen

- TI-Ag 胸腺非依赖性抗原
- TD-Ag 胸腺依赖性抗原, most antigen. 
  - Th cell activates B cell


| antigen          | TD-Ag                         | TI-Ag                  |
| ---------------- | ----------------------------- | ---------------------- |
| T cell dependent | yes                           | no                     |
| chemical nature  | most protein Ag               | most polysaccharide Ag |
| type of epitope  | B/TCR epitope                 | BCR epitope            |
| type of response | humoral/cell-mediated         | humoral immune         |
| type of antibody | various, mainly IgG, less IgM | IgM                    |
| memory?          | yes                           | no                     |

relationship

```mermaid
graph LR
le[linear epitope] --can be--> te[T cell epitope]
le[linear epitope] --can be--> be[B cell epitope]
ce[conformational epitope] --can be--> be[B cell epitope]
te --from--> TD-Ag
be --from--> TI-Ag
be --from--> TD-Ag
```

### Relationship (亲缘关系)

- heterophilic (异嗜性) antigen

- - common antigen between humans and other species
  - when a pathogen enters, the immune response causes autoimmunity

- xenogenic (异种) antigen

- - from other species, not common

- allogenic (同种异体) antigen

- autoantigen (自身抗原)

### Presenting

Whether it is synthesized inside APC

- yes: endogeneous (内源性) antigen.
- viral/tumor Ag
- no: exogeneous (外源性) antigen.
- bacteria, animal serum

### Other non-antigenic immune stimulators

general understanding

#### super antigen 

超抗原, low conc of which can stimulate T cells

- endogenous: viral protein
- exogenous: bacterial exotoxin (secreted protein)

#### adjuvant

佐剂, non-specific substances which are added together with antigen in vaccines, to enhance or change the type of immune response.

卡介苗, \text{Al(OH)}_3, artificial, Freundadjuvant

#### mitogen

丝裂原, which binds to their receptor and stimulates cell growth

> ### epitope mapping
>
> 表位的确定。To determine the action targets, to make vaccines
>
> Build an overlapping library and screen with the antibody
>
> key points
>
> - T cell need degradation (presenting), TCR indirectly recognize
> - BCR directly recognize both linear (no degradation) or conf (degradation) are ok

> 思考与小结
>
> 1. 抗原的免疫原性和反应原性（抗原性）及其关系
> 2. 决定免疫原性的因素
>3. 载体效应，交叉反应
> 4. 表位及表位的分类，表位与抗原的关系
>5. 常见的抗原的分类方法
> 6. 什么是超抗原  



# Chapter 4 Immunoglobin 

免疫球蛋白 Molecules with antibody-like activity.

Immunoglobulin super family (IgSF, 免疫球蛋白超家族): proteins including Ig-like domains

-  MHC, BCR, TCR, CD4, CD8, ....

## Structure

### Chains

- A Y-shape molecule. N terminal at the top.

- Two identical heavy chains (connected by S-S bond) and light chains, between which is a S-S bond

- heavy chain: 50kD, five isotypes (同种型): IgA/G/E/M/D ~ α/γ/ε/μ/δ chain

  light chain: 25kD, two types, κ/λ

### Domains

#### structure

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-domain.png" alt="4-domain" style="zoom:30%;" />

|                 | Heavy chain       | Light chain   |
| --------------- | ----------------- | ------------- |
| Constant region | sky blue, CH1/2/3 | orange, CL    |
| Variable region | blue, VH          | tangerine, VL |

hinge: flexible, between CH1 and CH2. not in IgM/E

#### function

- VH/VL: antigen binding

- - contains a hypervariable region (高变区) or complement-determining region (互补决定区), other region is called framework region

- CH1 and CL: allogenic marker (同种异型标志)

- CH2: complement binding site for IgG

- CH3: membrane receptor binding; cross 胎盘 for IgG; complement binding site for IgM

- CH4 is exclusive in IgM/E, following CH3

### Enzymolysis (酶解)

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-ab-cleavage.png" alt="4-ab-cleavage" style="zoom:25%;" />

> papain: 木瓜蛋白酶; pepsin: 胃蛋白酶

### Other components

- joining chain (J片): peptide at C-ter, joining secretary IgA dimer or IgM pentamer
- secretary IgA also need a glycopeptide, secretary piece (分泌片)

> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-other.png" alt="4-other" style="zoom:40%;" />
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-iga.png" alt="4-iga" style="zoom:33%;" />

## Diversity and Immunogenecity

### Diversity

- Constant region
  - according to hinge AA and S-S bond, the five isotypes are classified into different subclasses (亚类)
- Variable region
  - λ type is classified into 4 subtypes (亚型)

They are encoded by independent genes and just freely combine...which makes diversity.

### Immunogenecity

Ab can also be an antigen. Three types of epitope:

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-5.png" alt="4-5" style="zoom:25%;" />

- isotype: all C region.
  - Individuals in the same species have similar C region. If you inject monkey's Ab into a human, the C region could be an antigen.
- allotype: some residue variation in C region
  - There are gene variations between individuals inside a species too, which generates epitope in C region. A marker of individuals.
- idiotype: in V region (HVR)
  - Antibodies from the same individual have diverse V regions which may give rise to an epitope.
  - Anti-idiotype antibody as an alternative of the antigen to induce immune system.

## Interaction with Ag

- VH and VL all have 3 CDRs. In charge of binding. affinity
- VL gene is from recombinant V, D, J genes, while VH gene depends on subclasses

## Effects after Ag binding

### Neutralizing toxins and infection

> 参考：https://www.bilibili.com/video/BV1Gg411P7jS
>
> - 中和抗体只占人体产生抗体中的一小部分
> - 它们都能特异性结合病原体，但中和抗体可能结合入侵相关蛋白（如冠状病毒的S蛋白），或结合衣壳蛋白导致病毒核酸无法释放，直接阻止对人体的感染；非中和抗体可能结合其他位点，但无法阻止感染！
> - 非中和抗体有增强免疫的作用，与病毒结合后可以介导免疫细胞（如巨噬细胞）吞噬、清除病毒，杀敌于“国门之内”，在早期阶段发挥抗病毒作用。
> - 在中后期可能会导致免疫损伤，因为该抗体不能阻止病毒的侵染，所以病毒可能在吞噬它的细胞内部增殖、裂解之。这种途径使病毒能不依赖细胞表面受体而侵入原本无法入侵的细胞，称为抗体依赖增强作用（Antibody-dependent enhancement，ADE）

### Effect of C region

- activate complement system (see chapter 6 for details)

- bind Fc receptor on the cell surface
  - opsonization (调理作用): phagocytosis (吞噬作用) by macrophages and neutrophils through Fc binding to Fc receptor

    <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/4-ops.png" alt="4-ops" style="zoom:40%;" align=center />
  
    
  
  - enhance ADCC (antibody-dependent cell-mediated cytotoxicity) effect of NK cell, also through Fc
  
  - mediate type I hypersensitivity (超敏反应): mastocytes, basophils (嗜碱性粒细胞), IgE 
  
    > see chapter 10
  
- 穿过胎盘（IgG）与黏膜（分泌型 IgA）  

## Characteristics of several classes of Ab

### Five classes

| classes | state    | localization                                   | major function                                               |
| ------- | -------- | ---------------------------------------------- | ------------------------------------------------------------ |
| IgM     | pentamer | mainly in serum<br />monomer on B cell surface | primary immune response<br />strongest complement activation |
| IgG     | monomer  | in serum and body fluid                        | secondary immune response<br />can also in milk, pass 胎盘   |
| IgA     | dimer    | mainly mucosa (黏膜)<br />monomer in serum     | defend in mucosa<br />secreted into milk (乳汁)              |
| IgE     | monomer  | in serum, very little                          | may cause type I hypersensitivity                            |
| IgD     | monomer  | on B cell surface                              | marker of B cell maturation<br />not so clear                |

| more info | subclasses | formation               | more on structure | infection | features                           |
| --------- | ---------- | ----------------------- | ----------------- | --------- | ---------------------------------- |
| IgM       | only one   | advanced embryo         | no hinge, CH4     | early     | blood type<br />marker of 宫内感染 |
| IgG       | IgG1/2/3/4 | half a year after birth |                   | late      | long half-life                     |

### Class switching (类别转换)

same V region, C region genes conversion along with stages of infection

at DNA level, irreversible, from IgM to G to ...

[reference](https://www.youtube.com/watch?v=Gvq48XrzMTY)

## Preparation

### Polyclonal Ab

- a mixture of antibodies targeting a variety of epitopes
  
  > clone: a cell cluster derived from lymphocytes targeting a single Ag
  
- production: immunize animals with antigen

- usage: urgent treatment

- drawback: low specificity, low production, may cause allergy

### Monoclonal Ab

- from a single clone, targeting one epitope

- the flow of production

  - immunize mouse with Ag, isolate spleen cells
  - fuse them with myeloma cells (骨髓瘤细胞)
  - screen in HAT medium (for hybridoma cell 杂交瘤细胞)
  - identify the monoclonal Ab (for that desired Ab)
  - amplification

  > HAT medium:
  >
  > - 氨甲蝶呤：从头合成途径中二氢叶酸还原酶抑制剂
  > - 次黄嘌呤、胸腺嘧啶脱氧核苷：补救合成途径的原料
  >
  > 骨髓瘤细胞的HGPRT（补救合成的一个酶）缺陷，只有和淋巴细胞融合后才能生存
  >
  > B细胞只能在体外生存不超过一周

- features

  - high specificity, titer (效价), purity, mass production (大规模生产)
  - murine, hinders clinical applications

  > 效价是指某一物质引起生物反应、达到一定效果所需的剂量

- applications

  - protein detection/purification, cell isolation
  - hormone/tumor Ag/pathogen detection, therapy


### Genetically engineered Ab

- also known as recombinant Ab: antibodies whose genes are cut, spliced, modified, and transfected into and expressed in appropriate recipient cells.

  通过基因工程技术对抗体各链基因的剪切、拼接、修饰，并转入适当的受体细胞中从而生产出的抗体

  - modification: reserve Ag binding domain; simplify non-binding domain
  - goal: humanize, miniaturization (小型化), multi-functionalized. keep specificity and affinity!

- types
  - humanized Ab

    - chimeric Ab (嵌合抗体): murine V region+human C region
    - reshaped Ab (改型抗体): murine CDR+human rest part
    - transgenic mouse: replaced with human Ig genes, completely humanized

  - small Ab fragment

    - Fab: L chain+VH+CH, a linker is added

    - Fv: only VH and VL. If linker, called scFv Ab. 

      If only VH, called single domain Ab (单域抗体)

  - multi-functional Ab

    - bispecific Ab: two Fab domains recognize different targets (e.g. tumor and T cell)

      maybe Fc also recruits macrophage

    - bifunctional Ab: conjugated with enzyme, drug, etc. targeted therapy

- antibody phage display: build a library of V region genes by cloning from polyclonal B cells from immunized humans, importing them into phages. Tandem expression with minor coat protein enables to display Fv antibodies on the surface of phages. Then we can screen Ab with the desired affinity with our antigen.

  <img src="../../course/molecular-immunology/molecular-immunology.assets/4-display.png" alt="4-display" style="zoom:50%;" />

> 小结
> 1. 抗体的功能是什么？
> 2. 各型抗体的特点是什么？
> 3. 什么是单克隆抗体？什么是多克隆抗体？
> 4. 杂交瘤技术的基本原理是什么？
> 5. 抗体是如何被改造的？  



# Chapter 5 Complement System

补体系统. reference videos

- [20 min to master the complement system, a great video](https://www.youtube.com/watch?v=Uc4nq4Lazo4&list=PLybg94GvOJ9Ha_e6t4NvnCjCyNmJyAvhO&index=10)
- [an animation on the overall processes](https://www.bilibili.com/video/BV1Dt411w7Ro)

## Introduction

### Discovery

> 1. 新鲜的霍乱弧菌抗血清与细菌混合后可以溶解细菌
> 2. 对抗血清加热后丧失溶菌能力
> 3. 加热后的抗血清补充新鲜血清后可以恢复溶菌能力
> 4. 不含抗体的新鲜血清不具有溶菌的能力。  

### Components

1. 固有成分：C1（C1q，C1r，C1s）~C9，MBL，丝氨酸蛋白酶，B因子，D因子，P因子。
2. 补体受体：CR1~CR4，C3aR，C4aR， C5aR
3. 调节蛋白 
   1. 可溶性分子
   2. 膜结合分子

### Nomenclature

- C stands for "complement", x represents the order of discovery
- Cx is cleaved into Cxa (smaller fragment) and Cxb (binding portion)
  - except C2, which is reversed
- should add a line over an activated enzyme: $\mathrm{C}\overline{\text{1s}}$, $\mathrm{C}\overline{\text{4b2a3b}}$. But I'm too lazy to do that then...
- combine them to form a complex. e.g. C5 convertase = $\mathrm{C}\overline{\text{4b2a3b}}$

## Activation

Note: these reactions occur on the surface of the pathogen or an infected host cell. Will be referred to as "the surface" in the following context.

### Classic pathway (经典途径)

1. Upon binding to Ag, IgG/M changes its conformation and exposes the C1q binding site on CH2.

   > C1q may also recognize the pathogen surface or some specific proteins on it

2. C1q's binding to Ab results in the autocatalytic activation of C1r which is bound to C1q

   <img src="../../course/molecular-immunology/molecular-immunology.assets/5-c1q.png" alt="5-c1q" style="zoom:50%;" />

3. C1r cleaves and activates C1s, which then cleaves circulating C4 and C2. C4b is then bound to the membrane or the Ab, forming a **C4b2a complex**.

   <img src="../../course/molecular-immunology/molecular-immunology.assets/5-c4b2a.png" alt="5-c1q" style="zoom: 30%;" />

4. The complex is called classical pathway **C3 convertase C4b2a**, which cleaves C3 into C3a and C3b. 

### Alternative pathway (旁路途径)

1. activators: LPS, glucan, 酵母多糖. 

   > But they only provide a protective environment for the reaction or an adhesive surface, and are not involved in the actual recognition. Without infection, regulator proteins like Factor H and I, inhibit C3bBb and C3b respectively, while pathogen components inhibit regulators.

2. C3 is slightly and spontaneously hydrolyzed into C3(H<sub>2</sub>O), which is usually in the liquid phase, and has C3b-like properties, enabling attachment to the surface.

   > in C3(H<sub>2</sub>O), C3a is incompletely released, which also exposes the thiol ester that is then attacked by −OH or -NH2 residues and helps C3b to be located on the surface.

3. C3(H<sub>2</sub>O)/C3b also recruits Factor B, which is cleaved by Factor D into Bb. A factor P is added to stabilize the structure, which makes the primary C3 convertase C3(H<sub>2</sub>O)Bb.

4. C3bBb produces more C3b. **Positive feedback**! C3b goes the same process and induces a large amount of the alternative pathway **C3 convertase C3bBbP**.

   > Another kind of C3 convertase, different from the above one!

![5-alter](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-alter.png)


### MBL pathway

> MBL means 甘露糖结合凝集素  mannose-binding lectin
>
> lectin: a class of small proteins that bind pathogen-specific carbohydrates
>
> ficolins: another class of sugar-binding proteins

1. MBL binds to mannose residue on the cell wall, activating MASP (MBL-associated serine proteases)

   > MBL is also a hexamer like C1q

2. MASP2 cleaves other MASP2 molecules, and then cleaves C4 and C2.

   the same as C1s, goes into the classical pathway
   
3. MASP1 cleaves C3, but goes into the alternative pathway

<img src="../../course/molecular-immunology/molecular-immunology.assets/5-mbl.png" alt="5-mbl" style="zoom:45%;" />

### summary

overall pathways: all converge into C3 activation


```mermaid
graph LR
c[classic pathway] --> c3[C3 activation]
a[alternative pathway] --> c3
m[MBL pathway] --> c
m[MBL pathway] --> a
c3 --> c5[C5 activation]
c5 --> mac[MAC formation]
c3 --> o[other responses]
```

| pathway     | activator             | main players  | characteristics                       |
| ----------- | --------------------- | ------------- | ------------------------------------- |
| classical   | Ag-Ab complex         | C1q,r,s,C4,C2 | relies on antibody, late infection    |
| alternative | LPS, glucan, etc      | C3b, Bb       | evolutionarily older, early infection |
| MBL         | pathogen carbohydrate | MBL, MASP     | also early infection                  |

## Membrane attack complex

1. Whichever C3 convertase + C3b = **C5 convertase**, cleaves C5 into C5a and C5b.

   > which includes: C4b2a3b and C3bBb3b (C3bnBb)
   
2. The binding cascade is shown below:
   
   <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-mac.png" alt="aaaa" style="zoom:40%;" />
   
   binding induces a conformational change (C7/8/9) that exposes hydrophobic residues and allows inserting into the membrane
   
3. 10-16 (19?) C9 molecules polymerize and form a pore

   > see full structure: [6H04](https://www.rcsb.org/3d-view/6H04)

4. lysing the cell

   - loss of plasma membrane integrity
   - causes an influx of water (a few ions) and burst (胀破) of the cell

## Biological function

### Bacteriolysis and cytolysis effect

溶菌和溶细胞效应

- based on MAC, defending pathogens like G<sup>-</sup> bacteria and enveloped viruses, or tumor cell

- it may cause human cell lysis. autoimmune disease or transplant rejection. 

  > the MAC complex might be released and inserted into the membrane of a normal cell

### Complement-mediated Opsonization

补体介导的调理作用

Molecules like C3b (also smaller fragments), C4b, etc. are recognized by receptors on phagocytes, like CR1/3/4. This induces **receptor-mediated phagocytosis** <font color=grey>and the secretion of proinflammatory molecules</font>.

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-opson.png" alt="5-opson" style="zoom:40%;" />

### Clearance of immune complex

清除免疫复合物。Also called immune adherence.

Activated by Ag-Ab complex, C3b is produced and recognized by erythrocytes (红细胞) and platelets (血小板) who transport the immune complex (IC) to the liver and spleen, where ICs are cleared by phagocytosis.

<img src="../../course/molecular-immunology/molecular-immunology.assets/5-adhesion.png" alt="5-adhesion" style="zoom:50%;" />

### Inflammatory response

介导炎症反应。mediated by the small fragments that are released into the bloodstream.

- anaphylatoxin (过敏毒素): C3a, C5a

  recognized by mastocytes, basophils, induces degranulation (脱颗粒), and then histamine (组胺) release (see kinin function); 

  activates monocytes to produce cytokines like IL-1

- chemokine (趋化作用): C3a, C4a, C5a

  attract inflammatory cells, like neutrophils to infiltrate the infected tissue. 

  > chemotaxis (趋化)/metastasis, adhesion molecule production, for cells to move and extravasate
  >
  > also facilitate producing ROS, prostaglandin (前列腺素), etc

- kinin-like function (激肽样作用): C2b

  causes vasodilation (血管舒张) of capillaries (毛细血管), increases the permeability

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-c5a.png" alt="5-c5a" style="zoom:40%;" />

### Other

> - may induce adaptive immune responses
> - maintain homeostasis
> - interact with other systems like coagulation (凝血)

## Regulation

> general understanding

### Self-degradation

C3/4/5b is rapidly degraded in the liquid phase.

### Regulators

#### Activation

- classical

  > liquid phase: C1抑制物 (C1INH)，C4结合蛋白（C4bp)，I 因子
  >
  > <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-re-c1.png" alt="5-re-c1" style="zoom:25%;" />
  >
  > on the cell surface: 膜辅助蛋白（MCP），衰变加速因子（DAF)，补体受体（CR1)
  >
  > <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-re-c4b2a.png" alt="5-re-c4b2a" style="zoom:25%;" />

- alternative

  > I 因子，H 因子，膜辅助蛋白（MCP），补体受体（CR1)
  >
  > <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-re-c5.png" alt="5-re-c5" style="zoom:25%;" />

#### MAC

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-re-cd59.png" alt="5-re-cd59" style="zoom:25%;" />  

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-re-mac.jpg" alt="5-re-mac" style="zoom:40%;" />

### Related diseases

- 遗传性补体缺陷
- 补体功能失调

Types:

- too activated/weak regulation: autoimmune diseases, transplant rejection
- insufficiently activated/strong regulation: tumor evasion, infection

## Summary

![5-pathways](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/5-pathways.png)

> 思考题
>
> 1. 补体激活有那三条途径？各自的生物学意义如何？
> 2. 补体有哪些生物学功能？

# Chapter 6 MHC 

> 背景：器官移植
>
> - 遗传学家发现，同基因型个体不排斥，排斥程度符合孟德尔遗传定律
> - 免疫学家发现，再次移植同一个供体的器官，排斥得更快；能检测到抗供体的受体

主要组织相容性复合体 major histocompatibility complex:

- a cluster of genes determining the compatibility of a transplanted organ
  - translated into histocompatibility antigens
- closely related to immune response; genetic linkage (连锁)
- specific in mammals; in humans called Human Leukocyte Antigen (here MHC=HLA)

## HLA complex

### Genes

located in Chromosome 6 short arm. 6p21.3

> β2m: chromosome 15. not in HLA II!

order: 2, 3, 1

```mermaid
graph LR
hla --> 1[class I]
hla(HLA genes) --> 2[class II]
hla --> 3[class III]
1 --> 1c[classic HLA class I <br/> immune response]
1c --> 1cb[HLA-B]
1c --> 1ca[HLA-A]
1c --> 1cc[HLA-C]
1 --> 1n[non-classic HLA class I <br/> immune tolerance]
1n --> 1ng[HLA-G]
1n --> 1nE[HLA-E]
1n --> 1nF[HLA-F]
2 --> 2c[classic HLA class II <br/> immune response]
2c --> 2cp[HLA-DP]
2c --> 2cq[HLA-DQ]
2c --> 2cr[HLA-DR]
2 --> 2n[transporter associated with <br/> antigen processing, TAP]
2n --> dm[HLA-DM/O]
2n --> tap[TAP and <br/> associated genes]
2n --> psm[proteasome subunit <br/> PSMB8/9]
3 --> 31[complement component]
31 --> C4
31 --> C2
31 --> b[B factor]
3 --> 32[inflammatory related]
32 --> TNF
32 --> HSP70
32 --> regulator
32 --> mic["MIC(A/B)"]
3 --> 33[other]
```

> - HLA-G: Maternal-fetal tolerance, receptor:NKG2
> - HLA-E: NK cell tolerance, receptor: KIR
>
> MIC: MHC class I related gene

DP/DQ etc. has multiple genes in one locus (基因座). Each α and β have 2 types of chains.

> A locus is **the specific physical location of a gene or other DNA sequence on a chromosome**, like a genetic street address. A, B, C, G, F are all **loci**.

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-gene.png" alt="6-gene" style="zoom:39%;" />

Each gene has exons encoding all needed chains.

> Different! In HLA II, A and B expresses α and β chain, respectively; while there's only an α chain in HLA

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-gene2.png" alt="6-gene2" style="zoom:50%;" />

### Genetic characteristics

- various genes (**多种基因**)

- co-dominance (**共显性**): in an individual, both maternal and paternal alleles are expressed simultaneously (even though they might be heterozygous)

  > blood type Ag is also co-dominantly expressed

- polymorphism (**多态性**): in a population, there are a huge number of alleles in one gene locus.

  > HLA is the most polymorphic gene, not "one of". multiple alleles (复等位基因)
  
- haplotype heredity (**单倍型遗传**): all HLA genes are so closely linked that considered as a complete genetic unit (作为一个整体遗传).

- non-balance distribution and linkage disequilibrium

  - **非随机分布**: different alleles express at certain frequencies, which vary with geographical regions.
  - **连锁不平衡**: as above. (the frequency of two alleles presenting in the same chromosome is higher than predicted.)

> provide public access to the data through the websites http://www.ebi.ac.uk/ipd/imgt/hla/ and here at [http://hla.alleles.org](http://hla.alleles.org/nomenclature/index.html). submit the sequences directly to the [IPD-IMGT/HLA Database](http://www.ebi.ac.uk/ipd/imgt/hla/)
>
> check the most updated data there!
>

> HLA-genotyping (基因分型): determine the genotype of <u>12 HLA molecules</u> in an individual
>
> essential for matching (配型) in organ transplant, paternity test (亲子鉴定), etc.
>
> HLA I seems more diverse.

[Naming Rules](http://hla.alleles.org/nomenclature/naming.html)

![6-naming](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-naming.png)

## HLA molecule

### MHC class I

- extracellular domain

  β2m and α3 linked by a disulfide bond

- transmembrane domain

- intracellular domain: signaling

MHC class I is presented on the surface of any karyocytes (有核细胞) (except 滋养层细胞).

​			<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-mhc1.jpg"  style="zoom:25%;" />								<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-mhc2.png"  style="zoom:75%;" />

<center>left: MHC I; right: MHC II</center>

### MHC class II

- still the 3 domains
- α1 and β1 contact the TCR
- a symbol of the ability of antigen-presenting

Expressed on professional APCs, B cells, activated T cells, thymus epithelial cells, etc.

> why activated T cells??

### MHC function

#### That is: antigen presentation

| pathway | presenting cell     | antigen    | T cell type            | effect              |
| ------- | ------------------- | ---------- | ---------------------- | ------------------- |
| MHC I   | tumor/infected cell | endogenous | CD8<sup>+</sup> T cell | cytotoxic effect    |
| MHC II  | APC (see above)     | exogenous  | CD4<sup>+</sup> T cell | promotes CTL and Ab |

![6-anchor-point](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-anchor-point.png)

Some AAs are recognized by MHC and some TCR.

#### Related functions

- AP related
  - MHC restriction: TCRs have to recognize MHC (when recognizing the antigen peptide)
  - T cell development, selection (see later chapters)
  - determines disease sensitivity (Ag presenting; linkage with sensitive genes 易感基因)
  - involved in the heterogeneity of the genetic structure of the population (种群基因结构的异质性)
  - involved in transplant rejection
- Immune regulation
  - encode complement molecules
  - encode inflammatory factors
  - induce self-tolerance: MHC binds to KIR and NKG receptor

## MHC in medicine

1. HLA与器官移植的关系

   常用匹配位点： HLA-A， B， C， DRB1

   血清学分型：依据不同HLA蛋白分子的抗原性不同

   基因分型： 直接比较基因的序列

   > major histocompatibility complex: antigens that induce strong and rapid rejection
   >
   > minor: weak and slow

2. HLA与输血反应的关系
   
   白细胞溶血由白细胞携带的HLA不同导致（宿主抗移植物效应）
   
3. **HLA与疾病的相关性**：见上易感基因。百余种疾病！

4. HLA与法医
   
   利用HLA的多态性（但不会变）进行亲子鉴定和身份确认
   
5. HLA与新型疫苗的开发  

## Summary

![6-summary](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/6-summary.png)

>No reflection questions



# Chapter 7 Cytokines 

细胞因子

Cytokines are small multi-bioactive polypeptides or glycoproteins secreted by various cells (especially immune cells).

## Common features

> just glimpse

### Basic characteristics

- soluble small protein (8~30kD)
- low concentration, highly effective
- induced, short half-life
- the below two

### Mode of action

> 自分泌、旁分泌、内分泌

- autocrine: itself
- paracrine: adjacent
- endocrine: far away

### Functional Features

- 多效性：一种细胞因子，多个靶细胞
- 重叠性：多种细胞因子，类似生物功能
- 协同性：一种加强另一种
- 拮抗性：一种抑制另一种
- 网络性：复杂的相互作用

## Categories and biological properties

### Summary

| categories                      | meaning                               | representative                          | source cell                                                  | function                                                     |
| ------------------------------- | ------------------------------------- | --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Interleukin                     | conversation among leukocytes         | IL-2                                    | activated T cells                                            | proliferation of T/B/NK cell/LAK/monocyte                    |
| Interferon                      | interfere viral replication           | type I: IFN-α/β/ε/ω<br />type II: IFN-γ | type I: infected cells, lymphocytes<br />type II: activated/NK cells | type I: anti-tumor/virus<br />type II: boost immune response |
| Colony-stimulating factor (CSF) | hematopoietic cells (see below)       | IL-3, GM-CSF, EPO, etc.                 | T cells, Mo/Mϕ, mesenchymal cells and some from other tissues | proliferation, differentiation, and activation                |
| Chemokine                       | directional migration of immune cells | CXC, CC, C, CX3C family                 | T naive/act, Th cell, B cell, Mo/Mϕ/NK/DC                    | attract and activate immune cells, regulate angiogenesis     |
| Tumor necrosis factor (TNF)     | tumor necrosis (like interferon)      | types: TNF-α/β<br />FasL, TRAIL         | activated monocytes or macrophages (α), T cells (β)          | kill target cell, regulate immune response                   |
| Growth factor                   | promote growth and differentiation    | TGF-β, VGEF, EGF, FGF, NGF, PDGF        | tumor cells, fibroblasts, macrophages                        | promote growth and differentiation                           |

LAK：淋巴因子激活的杀伤细胞

### Comments

#### Colony stimulating factor

meaning: proliferation and differentiation of pluripotential hematopoietic stem cell and hematopoietic progenitor cell

mainly: Mo/Mϕ, endothelial cells, fibroblasts

> | CSF    | Chinese            | source                                  | function                                                     |
> | ------ | ------------------ | --------------------------------------- | ------------------------------------------------------------ |
> | IL-3   | 白介素-3           | T cell                                  | pulripotential hematopoietic stem cell (into myeloid progenitor) |
> | GM-CSF | 粒细胞/巨噬细胞CSF | T cell, "mainly"                        | myeloid and red stem cell, Mϕ activity<br />neutrophil, eosinophil, erythrocyte, DC |
> | M-CSF  | 巨噬细胞CSF        | "mainly"                                | monocytes, Mϕ activity                                       |
> | G-CSF  | 粒细胞CSF          | "mainly"                                | granuloid stem cell (e.g. neutrophil)                        |
> | SCF    | 干细胞因子         | hepatic cells (肝细胞)<br />fibroblasts | pulripotential stem cell, melanophore (黑色素细胞), mastocyte |
> | EPO    | 红细胞生成素       | renal cells (肾细胞)                    | 红系 stem cell                                               |
> | TPO    | 血小板生成素       | hepatic and renal cells                 |                                                              |

#### Chemokine

nomenclature: 

- chemokine: family + L + num, e.g. CXCL8
- receptor: family + R + num, e.g. CCR5

## Cytokine receptor

Three regions, for signaling.

### Membrane CR: categories

| xx superfamily receptors | also known as/abbreviated         | their ligands                                            | domain structure                                             | remark                                                       |
| ------------------------ | --------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Immunoglobin             | IgSFR                             | IL-1/18, M-CSF, SCF                                      | α/β, each has one or more IgSF domain(s)                     | GM-CSF subfamily: IL-3/5, common β                           |
| Hematopoietic factor     | Type I cytokine RSF               | IL-2$\sim$7, 9, 11$\sim$13, 15,...<br />GM-CSF, G-CSF... | α/β clamps ligand<br />intracellular γ<br />conserved Cys and WSXWS | IL-2 subfamily, common γ<br />IL-6 subfamily, common gp130   |
| Interferon               | Type II cytokine RSF              | IFN-α/β/γ, IL-10, etc.                                   | similar, except WSXWS                                        | [Jak/STAT pathway](https://www.bilibili.com/video/BV1ub4y1b7B5/) |
| TNF                      | Type III cytokine RSF<br />TNFRSF | TNF-α/β<br />CD27/30/40L<br />NGF, Fas                   | mostly homotrimer<br />each chain has many Cys-rich domains  |                                                              |
| Chemokine                |                                   | IL-8                                                     | all are GPCR                                                 | also Jak/STAT pathway                                        |

### Subunits

- Some subunits are for recognition; some for signaling. 

- Some are shared, which have similar functions. e.g. IL-2/4/7/9/15/21

- affinity

  <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/7-receptor.png" alt="7-receptor" style="zoom:33%;" />

### Soluble cytokine receptor

Some are circulating and only have binding domains. Their work might be:

- inhibiting: competing with membrane receptors
- enhancing: transport and gather cytokines 

## Biological effects

- regulate immunity
- participate in inflammatory response
- stimulate proliferation and differentiation of hematopoietic cells
- induce apoptosis
- promote wound healing (愈伤)
- 神经-内分泌-免疫网络调节

> No reflection questions



# Chapter 8 Innate Immune System

Before everything begins, we should memorize:

![lineage](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/lineage.jpg)

*Mo*=Monocytes, and *Mϕ*=macrophages, monocytes differentiate into Mϕ or DC.

PMN=polymorphonuclear多形核白细胞 (neutrophil, basophil (*Ba*), ensinophil (*Eo*))，也称粒细胞

髓系细胞包括：红细胞、血小板、粒细胞、单核细胞，还有经典DC、肥大细胞等（DC有髓样的也有浆细胞样的）

淋巴细胞包括：(αβ)T细胞、B细胞、NK细胞，固有样淋巴细胞还有：NKT细胞、γδT细胞、B1细胞等

这些（除了红细胞、血小板）全都是白细胞。

狭义的免疫细胞等同于白细胞，广义的免疫细胞还包括其他组织的相关细胞，如呈递抗原的内皮细胞。

> should draw a Venn plot

## Components

### Barrier (屏障作用)

balances tolerance and response

#### skin and mucosa

> The mucosa is larger than the skin!

- 机械阻挡作用：致密结构，tight junction
- 分泌物：眼泪、唾液，anti-bacterial substances
- 免疫细胞
  - 皮肤：皮试，试是否过敏
  - 黏膜：丰富的IgA、淋巴细胞、滤泡

- 正常菌群
  - 寄生在黏膜表面的，大量微生物
  - 提供营养、免疫防御（如分泌毒素），帮助塑造了免疫系统


<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-skin.jpg" alt="8-skin"  /><img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-mucosa.png" alt="8-skin" style="zoom:70%;" />

<center>left: langhans cell in the skin; right: mucosa distribution</center>

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-Intestinal Immune System.gif" alt="8-Intestinal Immune System" style="zoom:70%;" />

<center>intestinal immune system</center>

#### organs

##### blood-brain barrier

- prevents pathogen, lymphocytes and big molecules (like toxins)

  > it's newly discovered that there exist lymph-vessels (淋巴管) in the brain, published in Nature

- endothelial cells in the capilliaries are tighly joined, with astroyte (少突胶质细胞) forms 鞘壁 that covers the capilliaries

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-bbb.png" alt="8-bbb" style="zoom:50%;" />

##### placenta barrier

滋养层细胞阻挡来自母体的细菌等

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-placenta.png" alt="8-placenta" style="zoom:40%;" />

### Innate immune cells

#### Phagocytes

##### pattern recognition receptor

recognize **common structures** in pathogens directly

> on the surface of macrophages, DC, organ, and serum, etc.

- PRR inculdes

  - membrane: mannose receptor (MR), scavenger receptor (SR, 清道夫受体), Toll-like receptor (TLR)
  - secretory: MBL, C reaction protein (C反应蛋白), LPS binding protein (LBP)

- its ligand (模式分子)

  - pathogen-associated molecular pattern (**PAMP**)

    conserved, components on pathogen surface, like LPS, DNA, RNA, phospholipids

  - damage-associated molecular pattern (**DAMP**)

    HSP, uric acid crystal, ROS, degraded substance (like apoptosis)

> for reference
>
> ![8-prr](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-prr.png)

##### macrophage

###### basics

- types: Kuffer cell (枯否细胞, liver), microglial (小胶质细胞), osteoclast (破骨细胞, brain), free marophages (tissues). widely distributed.
- morphological characteristics: rich in cytosol and granules, shape-changing

###### ways of cytosis (吞噬)

- phagocytosis

- pinocytosis

- receptor-mediated endocytosis (like FcR, MR, complement ↓)

  <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-receptor-mediated.png" alt="8-receptor-mediated" style="zoom:40%;" />

###### mode of destruction

- oxygen-dependent: coenzymes reduce O<sub>2</sub> into various ROS; iNOS produces NO
- oxygen-independent: lactate accumulation; lysozyme etc., antibacterial peptide distruct the cell wall

###### functions

- clear pathogens
- kill infected/tumor cells, 胞内寄生菌
- mediate inflammatory response (produce cytokines)
- process and present Ag, secondary response
- immune regulation

##### neutrophil

- distributed in blood, 60 to 70 percent of white blood cells. rapid generation and short half-life
- morphological features: 分叶核, rich in granules
- similar function of cytosis
- mode of distruction: MPO (髓过氧化物酶), etc; oxygen dependent and independent
- functions: clear pathogens (mainly bacteria), induce inflammatory response

#### Dendritic cells

morphological features: look like dendrite (树突)

##### classical (cDC)

- found in tissues and peripheral immune organs
- function
  - immature: Ag uptake (by PRR, opsonic receptor)
  - mature: Ag presentation (by expressing MHC and co-stimulator)

see [chapter 9](#Chapter-9-Antigen-Presenting) for more details! 

##### plasmacytoid DC (pDC)

produces IFN-α/β 

#### Natural killer cells

Large granular lymphocytes. No sensitization required.

##### receptors

| receptors  | ligand                | receptor motif | receptor example                               |
| ---------- | --------------------- | -------------- | ---------------------------------------------- |
| inhibitory | MHC I                 | ITIM           | KIR2/3DL, NKG2A                                |
| activating | MHC I <br />and other | ITAM           | KIR2/3DS, NKG2C-DAP12<br />non-MHC: NKG2D, NCR |

> 免疫酪氨酸抑制性模体: ITIM
>
> 杀伤细胞免疫球蛋白样受体: KIR, 2$\sim$3 Ig domains
>
> 杀伤细胞凝集素样受体: KLR, CD94 and NKG2 family heterodimer
>
> short aa chain--activation, long aa chain--inhibition
>
> 自然细胞毒性受体: NCR
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-nkr.png" alt="8-nkr" style="zoom:60%;" />
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-nkr2.png" style="zoom:60%;" />

##### mode of action

- direct attack: perforin-granzyme
- induce apoptosis: FasL, TRAIL
- ADCC effect

against infected/tumor cell

> cytotoxic pathways: perforin-granzyme and Fas/FasL

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/8-nk.jpg" alt="8-nk" style="zoom:70%;" />

#### Innate-like lymphocytes

固有样淋巴细胞 (ILL), is between adaptive and innate immune cells. 

Restricted diversity, directly recognize pathogens and become activated.

| cell type | feature                                | found in                   | antigen                                | response                                                     |
| --------- | -------------------------------------- | -------------------------- | -------------------------------------- | ------------------------------------------------------------ |
| NKT cell  | both TCR-CD3 and CD56 (a symbol of NK) | bone marrow, liver, thymus | phospholipids, glycolipids             | cytotoxic effect and cytokines                               |
| γδT cell  | TCR: γ,δ chain                         | mucosa (early)             | MICA/B, viral protein, HSP, P/G lipids | the same                                                     |
| B1 cell   | self-renewing B cells                  | 胸膜腔，腹膜腔，小肠固有层 | TI-Ag, denatured self Ag               | rapid IgM, early resposne; no <br />class switching, no memory |

A lot of other cells are involved in innate immune response, like mastocytes.

### Innate immune molecules

- complement (see [chapter 5](#Chapter-5-Complement-System))

- cytokines (see [chapter 7](#Chapter-7-cytokines))

- other

  - antibacterial peptide. e.g. α-defensin (防御素) 

    > positive-charged, bind to LPS, 磷壁酸, etc.; hydrophobic part insert into the cell wall

  - lysozyme: lyse peptidoglycan on the cell wall of Gram-positive bacteria; 

    > requires complement and antibody to destruct Gram-negative bacteria

  - β-lysin (乙型溶素): heat-stable, only G<sup>+</sup>


## Innate immune response

### Process

1. <u>immediate</u> innate immune: $<4$ hours, local innate immune cells function, neutrophils enter.
2. early innate immune
   - chemokines recruit macrophages, which release more cytokines
   - NK and NKT cells enter
   - B1 cell produces Ab
3. initiates <u>adaptive</u> immune response

### Characteristics

- non-specific
- no clonal amplification (克隆扩增)
- rapid and short, no memory
- regulates adaptive immune

### Relationship with adaptive ir

I: innate; A: adaptive

- I initiates A: Ag presenting, like DC
- I regulates strength and type of A: type of cytokines
- I assists effector T cells to enter the location of disease: chemokines
- I cooperates with effector T cell and antibody to function: complement, ADCC

## Summary

- 固有免疫的构成
  1. 屏障作用
     - 皮肤黏膜屏障：物理屏障，化学屏障，菌群的作用
     - 器官屏障：解剖基础，屏障的作用（阻挡病原体，大分子，活化的淋巴细胞）
  2. 免疫细胞：巨噬细胞，中性粒细胞， NK细胞， 树突状细胞，嗜酸性粒细胞，嗜碱性细胞，肥大细胞， NKT细胞， γδT细胞， B1细胞
     - 如何识别
     - 作用机制
  3. 固有免疫分子
- 固有免疫的特点
- 固有免疫应答的过程及其与适应性免疫应答的关系  



# Chapter 9 Antigen Presenting

T cells cannot directly recognize antigens (even peptide); need the help of APCs.

## Antigen presenting cells

### Basics

APCs are cells which can process antigens and present them to T cells in the form of pMHC complex.

Two conditions must be satisfied to make it an APC:

- degrading proteins
- express MHC molecules
  - MHC I: tumor/infected cells
  - MHC II
    - professional: DC, Mϕ, B cell
    - inflammatory: endothelial/epithelial cells, fibroblasts

### Dendritic cells

#### Classical DC (cDC)

- from myeloid progenitor cells, everywhere in the body.
- high expression of MHC II, can activate naive T cells (初始T细胞)

classical DC also includes 

- follicular dendritic cells (FDC)
  - in follicles
  - low expression of MHC II, weak presenting
  - but keeps Ag-Ab for long to stimulate B cells and forms immune memory
- langerhans cell

##### Maturation

Immature DCs in peripheral tissues [phagocytosis (吞噬病原体、死细胞等), macropinocytosis (巨胞饮)],

and become mature DCs as they migrate into peripheral immune organs.

| terms                                        | immature DC              | mature DC          |
| -------------------------------------------- | ------------------------ | ------------------ |
| PRR (Fc/mannose receptor, ...) expression    | ++                       | +-                 |
| MHC II expression                            | +                        | ++                 |
| MHC II and lysozyme on the cell surface      |                          | largely $\uparrow$ |
| MHC II half-life                             | ~10 h                    | >100 h             |
| co-stimulatory/adhesion molecules expression | +-                       | ++                 |
| **main function**                            | Ag uptake and processing | Ag presentation    |

> what does +- mean? 有但较少
>
> there are a few mature DCs in mucosa and thymus.

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-mature.png" alt="9-mature" style="zoom:45%;" />

#### Other

- plasmacytoid DC (pDC): produces **type I IFN** 
- inflammatory DC: from monocytes, in inflammatory region
- a few DCs negatively regulate ..

#### Function

- uptake and present Ag, high co-stimulator expression
  - activate CD4<sup>+</sup> and CD8<sup>+</sup> T cell
  - the only one to activate **naive T cell** !
- immune regulation: produce cytokines
- induce and maintain immune tolerance
  - clonal deletion of T cells in thymus (see later chapters)
  - T cell tolerance when immature DCs in tissues interacts with them

Application: cancer vaccines. 

> Isolate monocytes from the patient and induce them to differentiate into immature DCs (or isolate these). Treat with tumor tissue lysate to maturate DCs. Inject them back.
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-dc.jpg" alt="9-dc" style="zoom:60%;" />

### Monocytes/Macrophages

- Mo is derived from bone marrow and differentiate into Mϕ
- good at Ag uptake and processing
  - expressing various receptors
  - three ways (see [chapter 8](#ways-of-cytosis-(吞噬)))
- under the action of IFN-γ/TNF-α (from T cell, etc.) 
  - high MHC I/II and co-stimulator expression, present Ag to CD4/8<sup>+</sup> T cell
  - enhanced all kinds of "cytosis"
- cannot activate naive T cells; so only in secondary response (**再次应答**)

### B cells

- mIg(膜免疫球蛋白, maily BCR?)-mediated endocytosis, Ag enrichment and processing
- present MHC II-Ag to Th cells (with co-stimulator in inflammatory conditions)
- reversely be activated by (CD4<sup>+</sup> and?) Th cells (TD-Ag) to produce Ab

**summary**

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-professional.png" alt="9-professional" style="zoom:60%;" />

## Antigen presenting

basic processes

- Ag generation (endo/exogenous)
- MHC synthesis and assembly with peptide
- pMHC presented to T cell

### MHC II pathway

#### Ag uptake and processing

- mIg-mediated
- complement-receptor-mediated
- Fc-receptor-mediated
- phagocytosis and pinocytosis

sent into endosomes (胞内体) and then lyzosomes for degradation

#### MHC synthesis, their transportation and assembly

##### overall flow

```mermaid
graph LR
bacteria --> phagosome --lysosome--> phagolysosome --> #
protein --cytosis--> endosome --> *
m2[MHC II in ER] --> m2c[M II C] --> * --> membrane
m2c --> # --> membrane
```

> phagosome: 吞噬体, phagolysosome: 吞噬溶酶体
>
> 内体：利用酸性来降解
>
> MHC二类小室 (M II C): MHC class II compartment, resembling lysosome
>
> phagolysosome and M II C: acidic, rich in proteases, both involved in degradation! 
>
> into 10$\sim$30 aa fragments

##### route of MHC II

![9-mhc2](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-mhc2.png)

Ia-associated invariant chain, Ii chain, MHC分子相关恒定链

- helps with MHC folding and dimerization (2 heavy chains)
- <u>prevent MHC from binding self-peptide!</u>
- help MHC leave ER, then in the vesicles, it's degraded and only CLIP is left

> Ia is actually a trimer. 
>
> CLIP: MHC II类分子相关的恒定链多肽 CLass II-associated Invariant chain Polypeptide.
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-li.png" alt="9-li" style="zoom:50%;" />

- the vesicle enters M II C, where CLIP is removed with the help of HLA-DM

  > HLA-DO takes away HLA-DM

- then Ag peptide is loaded and the complex is transported onto the cell surface


Still, a number of adhesion molecules bind to each other, surrounding the complex.

### MHC I pathway

```mermaid
graph TD
subgraph peptide
v[viral protein] --ubiquitinated--> U-protein
e[endogenous protein] --ubiquitinated--> U-protein
U-protein --20S proteosome--> ap[Ag peptide in cytosol]
U-protein --26S immunoproteasome--> ap --TAP--> er[Ag in the ER] --ERAP--> m[mature peptide] 
end
m --> pMHC
subgraph TCR
a[α chain synthesis in ER] --cal*in--> protected --β2m,tapasin--> f[full empty MHC I]
end
f --modified--> pMHC
pMHC --> w{with</br>peptide?}
w --yes--> y[through Golgi to membrane]
w --no--> l[lysosomal degradation]
```

#### About peptide

- active β subunit of immunoproteasome is called LMP (巨大多功能蛋白酶体/低分子量多肽)
- TAP: TAP1/TAP2 heterodimer, forming an ATP-dependent pore that opens upon Ag peptide binding
  - TAP: ABC family. Requirement: 8$\sim$16-aa; basic//hydrophobic C terminal. 
- ERAP: ER resident aminopeptidase (ER驻留的氨基肽酶), cut the peptide into 8$\sim$12-aa length.

#### MHC structure

- MHC I is floppy, stabilized by β2m (and finally by peptide?).
- before β2m: also need 钙联蛋白; to bind TAP to get peptide: need 钙网蛋白, TAP相关蛋白

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-Comparison-of-TCR-pMHC-CD4-and-TCR-pMHC-CD8-ternary-complexes-A-Crystal-structure-of-a.png" style="zoom:60%;" />

<center>complex structure on CD4/8<sup>+</sup> T cell</center>

#### Comparison

![9-presenting](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-presenting.png)

### Lipid antigen

- no processing is needed

- goes the same way as MHC II (cytosis, endosome)

  > Sometimes they two bind to antigen on the cell surface before being recycled.

- its carrier is MHC I-like molecule CD1

  > CD1a$\sim$c : specific T cell; CD1d: NKT cell

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-apc2.png" alt="10-apc2" style="zoom:70%;" />

### Cross-presentation

交叉呈递, MHC I and II exchange their Ag type. Just a minor pathway.

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-cross.png" style="zoom:45%;" />

situations that can happen:

- MHC I-exo
  - exogenous Ag leaks out of its membrane and enters cytosol
  - exogenous Ag is released out of the cell and binds to an empty MHC I
  - MHC I is recyled into an endosome where it meets exogenous peptide
- MHC II-endo
  - cells/apoptotic bodies (凋亡小体) containing endogenous Ag are phagocytosed
  - endogenous Ag is released out of the cell and binds to an empty MHC II

> Application: MHC I tetramer, detecting Ag-specific CTL
>
> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/9-mhc4.png" alt="9-mhc4" style="zoom:60%;" />



# Additional Chapter: T/B cell development

## B cell

### BCR gene and VDJ recombination

#### Structure



#### Recombination



#### Ab diversity



### B cell development

#### Positive selection

See [Chapter 11](#somatic-hypermutation)

#### Negative selection



#### Categories

B1/2 cells



## T cell

### TCR gene recombination



### T cell development

#### Positive selection

See [Chapter 11](#somatic-hypermutation)

#### Negative selection



### T cell Categories





# Chapter 10 T cell-mediated Immune Response 

T细胞介导的免疫应答

## Recognition of Ag and activation of T cell

### Ag processing and presenting

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-ap.png" alt="10-ap" style="zoom:50%;" />

APCs like DCs, take up Ag in tissues, and enter lymph nodes to present Ag to T lymphocytes.

see [chapter 9](#chapter-9-antigen-presenting)!!

### Interaction between APC and T cell

A lot of molecules form pairs, making the so-called immunological synapse.

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-synapse.png" alt="10-synapse" style="zoom:50%;" />

- coreceptor: CD4/8
- co-stimulatory molecules: CD28
- adhesion molecules

steps

- Adhesion molecules form transient and reversible pairs; if TCR doesn't recognize pMHC, they separate.

- If TCR binds pMHC, it induces a conformational change in LFA-1 which strengthen the binding and prevent cells from separating.

  <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-lfa.png" alt="10-lfa" style="zoom:40%;" />

- Many TCR-pMHC complexes locate themselves in the center of cell interface

  - which is surrounded by adhesion molecule pairs, which makes a stable cell junction
  - These changes associate molecules to better transduce signals, i.e. activate pathways, remodel cytoskeleton, etc.

> <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-Differences-are-apparent-between-immunological-synapses-formed-by-B-cells-and-dendritic-cells.jpg" alt="10-immunological-synapses" style="zoom:80%;" />
>
> Two models. left: B lymphoma cells; right: dendritic cells.
>
> The immune synapse is also known as the supramolecular activation cluster or *SMAC*
>
> LFA-1: Lymphocyte function-associated antigen 1, in lectin superfamily
>
> Left model (as in text book):
>
> - c: central, except CD28, CD2, etc.; also CD3, Lck, ZAP70, PKC-θ, etc.
> - p: peripheral. LFA-1-rich; d: distal. microclusters that resemble cSMAC
>
> Right model: DC typically form “multifocal” synapses where TCR-containing clusters are segregated from CD28/PKC-θ containing clusters and no clear “ring” of LFA-1 is formed. (contradiction?)
>
> *Roufaiel, Marian & Wells, James & Steptoe, Raymond. (2015). Impaired T-Cell Function in B-Cell Lymphoma: A Direct Consequence of Events at the Immunological Synapse?. Frontiers in Immunology. 6. 258. 10.3389/fimmu.2015.00258.*

### CD4<sup>+</sup> T cell activation

> CD4<sup>+</sup> T cell $=$ Th cell 辅助性T细胞; naive CD4<sup>+</sup> T cell $=$ Th0 cell

Double signal model

#### 1. Ag recognition

TCR-pMHC, CD4-MHC, CD3, as above. Fundamental

CD3 mediates <u>initial activation</u> through Lck, NFAT, NFκB, etc. to promote growth and proliferation.

![10-pathway](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-pathway.png)

#### 2. Co-stimulation

Adhesion molecule like CD28

They mediates <u>complete activation</u> by additional proliferation signal, expression of cytokine and its receptor.

Without them, T cell anergy (avoid excessive activation)! 

Negative signal also inactivtes T cell

> - engineered CTLA-4 (Abatacept), inhibition, autoimmune disease.
> - CTLA-4 mAb, activation, cancer
>
> CD28 -- IL-2 production, competes with CTLA-4 for CD80/86

#### 3. Cytokines

Induces further differentiation and proliferation.

IL-2: essential for T cell expansion. Th cell: <u>autocrine</u>

Antigen(cytokine)-specific differentiation, determines the types of response  

<img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-diff.png" alt="10-diff" style="zoom:40%;" />

### CD8<sup>+</sup> T cell activation

Roughly the same. All karyocytes express MHC I, but target cell may not express co-stimulatory molecules.

#### Th dependent

> endogenous Ag

Ag signal$+$cytokines from Th cell

> DCs express both MHC I and II. Th produces IL-2
>
> ![10-th-dep](https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-th-dep.jpg)

#### Th indepedent

> exogenous Ag. Without IL-2, must highly express co-stimulators!!

- cross-priming: APCs also process exogenous Ag. see [chapter 9](#Cross-presentation), the figure for more.

- virus-infected APCs assemble MHC I and viral peptide in them.

  <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-Virus-infected-APCs-present-viral-peptides-in-the-context-of-MHC-class-I-or-II-to-naive.jpg" alt="10-Virus-infected" style="zoom:70%;" />

## T cell effective stage

#### CD4<sup>+</sup> T cell effect

flow charts

##### Relationship between cells

```mermaid
graph TD
%%linkStyle 1 stroke:#ff3,stroke-width:4px,color:red
DC --Ag presenting--> CD4+[(CD4+)]
DC --Ag presenting--> CD8+[(CD8+)]
%% Th1, DC
DC --IL-12<br/>CD4+ diff--> Th1[Th1]
Th1 --IFN-γ--> DC
%% CD diff
CD4+ ==> Th1 --IL-2<br/>CD4+ diff--> Th1
CD4+ ==> Th2 --IL-4<br/>CD4+ diff--> Th2
CD8+ ==> CTL[CTL] --IL-2--> CTL
%% Th Tc
Th1 --IL-2--> CTL
Th1 -.IL-2.-> Th2
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

  > no clear result on IL-2's effect on Th2....

- CTL is activated by IL-2 (self, Th1)

##### Th1 downstream: cellular immunity

```mermaid
graph TD
CD4+[(CD4+)] ==> Th1 --> l([CD40L,etc.]) --activation--> Mϕ --IL-12 if infected--> Th1
CD4+ --> co([IL-3,GM-CSF]) --monocyte<br/>differentiation--> Mϕ
Th1 --> co --recruit--> Mϕ --enhanced<br/>presentation--> CD4+

Th1 --> IL-2([IL-2])
IL-2 --> CTL --> IL-2
IL-2 --> Mϕ --> cyto[endocytosis]
IL-2 --> NK --> ct[cytotoxicity]

CD4+ --> IFN([IFN-γ])
Th1 --> IFN --> Th1
IFN --> Mϕ
TNFa --> NK
IFN --> NK
IFN --> CTL --> ct
IFN --> B[B cell] --Ab--> op[opsonization]
CD8+[(CD8+)] ==> CTL
Th1 --> TNFa([TNF-α]) --> neutrophil --> op
neutrophil --> cyto
neutrophil --> ct

classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,NK,Mϕ,CTL,neutrophil,B subcell
```

- Th1 and macrophage activate each other; monocyte diff and chemotaxis

- various cytokines activate NK, CTL, neotrophil, B cell, ....

  A lot is not shown...

  > TNF-α is also produced by NK, Mϕ, CTL, ...

##### Other Th cell and effects

```mermaid
graph TB
CD4+[(CD4+)] ==IL-4==> Th2 --> IL-4([IL-4])
IL-4 -.-> Th1
Th2 --> IL-10([IL-10]) -.-> Th1
IL-4 --> v[B cell,mastocytes,ensinophils] --> p[plasma cell]
Th2 --> IL-10([IL-10]) --> v
Th2 --> IL-5([IL-5]) --> v --> hypersensitivity
Th2 --> IL-13([IL-13]) --> v
Th2 --IL-3/GM-CSF--> Mϕ

CD4+ ==IL-6==> Th17[Th17] --IL-17--> ic[inflammatory<br/>cytokines]
Th17 --same as Th1--> Mϕ
Th17 --> autoimmunity

CD4+ ==TGF-β==> Treg[Treg] --TGF-β--> is[immune<br/>supression]
Treg --direct<br/>contact--> is

classDef cell fill:#f9f,stroke:#333,stroke-width:2px
class CD4+,CD8+ cell
classDef subcell fill:#bbf,stroke:#f66,stroke-width:2px
class Th1,Th2,Th17,Treg,CTL subcell
```

- Th2: humoral immunity
- Th17, Treg: see figure

Summary: a lot of functions are contradictory...

| response | cell type | immunity | pathogen      | hypersensitivity | other effect       |
| -------- | --------- | -------- | ------------- | ---------------- | ------------------ |
| type 1   | Th1       | cellular | intracellular | delayed          | APC, Tc            |
| type 2   | Th2       | humoral  | extracellular | allergy          | Ab class switching |



| T cell subgroup | cytokines inducing their generation | major types of cytokines produced | type of response      | biological function of these cytokines                       |
| --------------- | ----------------------------------- | --------------------------------- | --------------------- | ------------------------------------------------------------ |
| Th1             | IL-12, IFN-γ                        | IFN-γ, TNF-α, IL-2                | cell immunity         | Tc, Th differentiation<br />Mϕ, NK activation<br />proliferation,chemotaxis, inflammation and killing |
| Th2             | IL-4                                | IL-4, IL-10                       | humoral immunity      | B cell activation<br />class switching<br />hypersensitivity |
| Th17            | IL-6, TGF-β                         | IL-17                             | innate (inflammation) | inflammation!! auto<br />chemotaxis/activation               |
| CTL             | IL-2                                | IFN-γ, TNF-α                      | cell immunity         | direct killing                                               |

> Tfh cell: T follicular helper cell

#### CD8<sup>+</sup> T cell effect

feature: Ag-specificity, MHC-restriction

1. 效-靶细胞结合

   CTL migrates following chemokines, contact with the target cell, forms immunological synapse

2. CTL polarization

   Upon recognizing pMHC, TCR and related molecules move towards the interface. Some organelles also re-organize for the granules (containing perforin/granzyme) to release.

   > polarization: cellular components aggregate on one specific side of the cell

3. 致死性攻击

   - perforin: forms a pore on the membrane like C9 does, letting in water that burst the cell
   - granzyme: get inside through the pore, cleaves Bid (and some others) to initiate apoptosis
   - FasL: 

   > perforin: pore forming protein, facilitates granzyme endocytosis
   >
   > 
   >
   > <img src="https://gitee.com/gxf1212/notes/raw/master/course/molecular-immunology/molecular-immunology.assets/10-cte.png" alt="10-cte" style="zoom:80%;" />
   >
   > DTH: delayed-type hypersensitivity

## Effector T cell fate

1. apoptosis, to terminate immune response
   - activation-induced cell death (AICD): e.g. Fas expression
   - T<sub>reg</sub> induced death (see chapter 13)
   
2. to T<sub>m</sub> (memory T cell)
   - CD45RA<sup>-</sup>/RO<sup>+</sup> (exactly reverse the naive T cell)
   - rapid activation, more sensitive to Ag/cytokine
   - less requirement on co-stimulators, more cytokine production

3. CD8

  CD8*记忆T细胞﹐研究结果提示:①CD8Tm的产生无需T细胞分泌的细胞因子参与;2 CD8*Tm的维持无需抗原持续刺激和B细胞参与,亦无需Th辅助,但有赖于与MHCI类分子
  记
  的接触,可能需要T细胞CD28与CD80和 CD86结合所产生的共刺激信号持续存在;3IFN-a
  及IL-15等细胞因子在维持CD8+ Tm中可能发挥重要作用。

## T cell biological effects

- intracellular infection: 结核杆菌, fungi, virus, parasites
- anti-cancer: CTL, Mϕ, NK, cytokines
- immune damage: rejection, autoimmunity, etc.



# Chapter 11 B cell-mediated Immune Response 

B细胞介导的免疫应答

## Response to TD Ag

### B cell activation: primary signal

BCR-CD79a/b-CD19/CD21/CD81 binds Ag

- BCR binds Ag. 

  1) causing the internalization of Ag-Ab complex for Ag presentation
  2) the activation pathway looks like TCR

  > - CD79a/b (also known as Igα/β): like CD3, transduction into intracellular region, with ITAM motif
  > - Fyn, Lyn: like Lck; Syk: like ZAP70?
  > - finally NFAT, NFκB, etc.

<img src="../../course\molecular-immunology\molecular-immunology.assets\11-bcr.png" alt="11-bcr" style="zoom:70%;" />

- Co-receptor: CD19/CD21/CD81

  > - CD21: recognizes C3d (C3b is cleaved) that is binding on the Ag
  > - CD81 stabilizes the coreceptor complex
  > - CD19 conformational change, Tyr residues are phosphorylated, recruit SH2 adaptors (Fyn, etc.)

  the signal might be amplified 1000 times

<img src="E:\GitHub_repo\notes\course\molecular-immunology\molecular-immunology.assets\11-bcr-coreceptor.png" alt="11-bcr-coreceptor" style="zoom:60%;" />

BCR is different from TCR in:

- recognize not only protein Ag, but also NA, lipid, polysaccharide, etc.
- recognize the natural/partially-degraded Ag, not always peptide, i.e. also conformational epitope
- no APC requirement, no MHC restriction

### Naive B cell activation

Other than the primary signal, it also needs

<img src="E:\GitHub_repo\notes\course\molecular-immunology\molecular-immunology.assets\11-secondary.png" alt="11-secondary" style="zoom:25%;" />

- secondary signal like CD40L from Th2/Tfh2 cell

  > without that, B cell anergy

- cytokines from Th cells, macrophages, etc.

  so that B cells differentiate and produce Ab.

  > Remember, B cells can act as APC that helps with differentiation, and express B7 for CD28 to activate Th cells. The activation is **mutual**.
  >
  > With multiple adhesion molecule pairs, they form an immunological synapse.

```mermaid
graph LR
b[BCR recognize Ag] --> 1[primary signal] --> bc[B cell differentiation<br/>and Ab production]
b --> a[CD4+ T cell -> Th cell] --B7--> th[Th activation] --CD40L--> 2[secondary signal] --> bc
th --> 3[cytokines] --> bc
```

### B cell proliferation and events in germinal center

生发中心

<img src="E:\GitHub_repo\notes\course\molecular-immunology\molecular-immunology.assets\11-abconc.png" alt="11-abconc" style="zoom:33%;" />

#### Proliferation

| response           | region      | antibody          |
| ------------------ | ----------- | ----------------- |
| primary response   | bone marrow | produce IgM       |
| secondary response | follicles   | high affinity IgG |

Germinal center is formed (about 7 days after infection). 

<img src="E:\GitHub_repo\notes\course\molecular-immunology\molecular-immunology.assets\11-gc.png" alt="11-gc" style="zoom:60%;" />

> centroblast (生发中心母细胞): the core
>
> centrocyte (中心细胞): differentiated from centroblast

| zone  | cell type            | activity                                          | gathering |
| ----- | -------------------- | ------------------------------------------------- | --------- |
| dark  | centroblast          | divide rapidly, no mIg expression                 | closely   |
| light | centrocyte, fDC, Tfh | the opposite; further differentiation (see below) | loosely   |

> fDC: concentrate Ag on the surface using FcR and CR, for B cell to recognize. Maintain memory

#### Events

##### Somatic hypermutation

体细胞高频突变  



##### Ig affinity maturation

亲和力成熟：再次应答时，由于B细胞发生体细胞高频突变，
产生的多种具有不同亲和力的BCR和抗体。只有最高亲和力
的细胞能够继续增殖，并产生高亲和力的抗体  





##### Ab class switching





Most don't accomplish these will be cleared.



### B cell differentiation/fate

- plasma cell
  - migrate to bone marrow
  - produce antibody, but no longer express BCR or MHC II
- memory T cell
  - long live, relying on follicular DC

## Response to TI Ag











comparison

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |





## Ab: biological functions

1. 







# Chapter 12 Immune Tolerance

免疫耐受

> 发现：异卵双生小牛，共用胎盘，血型不同，但不发生排斥

## Basics

Immune Tolerance: a state of unresponsiveness of the immune system to **specific** substances or tissue.

- no immune molecules or activated lymphocytes
- tolerogen 耐受原

Different from immunodeficiency! 

> That's abnormal development, proliferation, differentiation and metabolism of lymphocytes.

Categories

- natural tolerance 天然耐受
  - came into contact during embryonic period
  - or after birth, 如口服耐受、妊娠耐受
- acquired tolerance 人工耐受

Influencing factors: the opposite of [immunogenicity](#Immunogenicity:-influencing-factors)

> antigen (MW, chemistry, structure complexity, physical property, epitope, etc.), host, route of entry















# Chapter 13 Hypersensitivity

















# Chapter 14 Transplant Immunity

## Immunology of transplant rejection

### History



types of transplantation

- autologous
- syngeneic (同系移植，相同遗传背景的，如同卵双胞胎)
- allogeneic
- xenogeneic

### Allogeneic antigens

- MHC
- mH (minor ...)
  - HY, on Y chromosome
  - mH, on autosome

### Innate immunity

- initiation
  - damage: 
- 

### Adaptive immunity







#### T cell recognition of transplant antigen

- direct recognition

| recognition          | APC        | host T cell  |      |               |
| -------------------- | ---------- | ------------ | ---- | ------------- |
| direct recognition   | from graft | allogenic    |      | acute         |
| indirect recognition | from host  | alloreactive |      | acute/chronic |



## Types of transplant rejection

> why is transplant rejection much stronger than normal response?



### Host versus graft reaction (HVGR)

|                      | occurence time                            | mechanism                                                 | pathological<br />features                                   | risk factors                                                 |
| -------------------- | ----------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| hyperacute rejection | within 24 hours<br />even several minites | prestored anti-graft antibody$\longrightarrow$ complement | bleeding (attacks endothelial cells), formation of microthrombus (微小血栓) | multiple transplant (多次移植), transfusion (输血), 妊娠     |
| acute rejection      | a few days, within a month                | T cell mediated response                                  | macrophage and lymphocyte infiltration                       |                                                              |
| chronic              |                                           |                                                           |                                                              | non-immune: <br />immune: low-level response continuously exists |

>occurence time: after connecting vessels



一边损伤一边生长

管腔变小

最终宿命

肝肾肺心





### Graft versus host reaction

移植物抗宿主反应

requirements:

- mature immune cells in the graft
- immune suppression in the host



GVL: graft versus lymphoma. 

攻击白血病细胞. balance!



## Prevention and dilemma

### Matching (配型)

- blood type: ABO, Rh

- HLA

- cross matching

  - 

- pool reactive Ab

  anti-HLA Ab



> 混合淋巴细胞反应：host and graft
>
> 如果增殖，说明能发生反应
>
> 丝裂霉素处理，阻断一方的增殖，便于观察另一个



### Immunosuppressant

- non-specific
  - block proliferation: 6-MP, 硫唑嘌呤
  - anti-inflammatory drug: glycotoid (may cause 内分泌紊乱)
- lymphocyte-specific Ab
  - OKT3 (anti-CD3)
- blocking activating signal
  - like anti-IL-2R Ab, FK-506 (block PLCθ pathway)



### Problems on organ transplantation

- organ shortage
- 离体器官 storage
- 















































