# Genetic Engineering

只展示思维导图。有些细节可能不全，但也够多的了。表格之类的复杂功能可能还整不了

一个关于这个页面怎么搭建的介绍：https://blog.csdn.net/gxf1212/article/details/123142111

代码示例

```mindmap
root
  topic1
    subtopic
  topic2
    subtopic
```

> refer to [link](https://gxf1212.gitee.io/notes/#/techniques/Specific-Software-Usage?id=functions) for docsify functions

# Chapter 1 绪论

1. 了解基因工程的概念
2. 了解基因工程主要技术操作流程
3. 了解基因工程的历史和发展，特别是重要的代表性亊件
3. 了解基因工程的在各个领域的应用

```mindmap json
Chp 1 Preface
  Opening
    COVID-19
      Tests
      Vaccine
      Variation
    CRISPR
      Editing
      Detection
      Clinical
    Synthetic life
  History
    Preparation
      Mendel, genetics
        Then 1909, gene
      Chromosome is the carrier
        Morgan
      DNA is genetic material
        Griffith; Hershey
      Double helix structure
        Waston et al
      Central dogma
        Crick et al
      Not 1 gene 1 protein
      Genetic code
      Discovery of enzymes
        Polymerase
        Ligase
        RE
      Resistance gene
      Recombinant DNA
        Berg, 1972
      Molecular biology
    Set up
      Recombinant and transformation
        Cohen, 1973
      Company and Product
        GeneTech, 1977
      Drugs, transgenic animal/plants, 1980s
  Definition
    Techniques to transform organisms in the level of genes, to make new characteristics
    A highly crossing discipline
  Applications
    Agriculture
      BT anti-pest cotton
      Golden rice (carotene)
      Pig, salmon, artificial meat,…
    Medicine
      Neutralizing antibodies production
        mRNA
        Virus vector
        Inactivated
        Recombinant protein
      Human growth hormone
      HBV
      PD(L)1 antibody
      CAR-T cell
      Drug bio-synthesis
    Environment
      Degradable material, …
    Interdiscipline
      DNA storage
      AlphaFold
  Ethic issues
    Transgenic food
    Ecological safety
      Suicide system
    Genetically-edited babies
  Course syllabus
    Procedure
      Enzyme
      Gene obtaining
      Vector and recombinant
      Transfer and identification
    Objects
      Prokaryotes
      Eukaryotes
      Mammals
      Plants
    Techniques
      Gene editing
      Detection & Diagnosis
    Ethics
```

# Chapter 2 工具酶

- 掌握限制性核酸内切酶（Type II和Type III）的作用原理及其应用
- 掌握DNA连接酶的作用原理及其应用
- 掌握常见DNA修饰酶的作用原理及其应用

```mindmap
Chp 2 Tool Enzymes
  restriction endonuclease
    R/M system
      Restriction
        Degrade foreign DNA which lacks in methylation
      Modification
        Methylate its own DNA
    Type II
      Nomenclature 
        genus(1)+species(2)+strain+number
      Characteristics 
        Recognize 4/6/8 bp palindromic sequence
        Cleave inside the recognition sequence
        Generate either sticky or blunt end
          Sticky better when ligation
      Relationship
        Isoschizomer
          Same recognition sequence
          Not necessarily same sticky ends
        Isocaudamer
          Same sticky ends
          Not necessarily same recognition seq
      Digestion
        Partial
          Low temp
          Short time
        Termination
          Add buffer with SDS
          65 Celsius, 5 min
    Type III
      Characteristics
        Recognize non-palindromic sequence
        Cleave outside (downstream) the recognition sequence
        Sticky end can be designed!
      Golden gate assembly
        Design different sticky ends up/downstream your multiple target genes
        Assemble them in specific order!
        In one step, and only use one enzyme (eg: BsaI)
        Can not be cut again after ligation
          Because recognition sequence is outside the gene segment you previously cut out
    Factors affecting the activity
      Impurities in DNA extract
        Ethanol, DNAase,…
      DNA methylation (harder)
        No methylase in engineered strains
      DNA structure
        Supercoil harder
        Linear DNA end harder
          Protective 4 bases
      Temperature
        Mostly 37 Celsius
      Buffer
        Mg2+
        pH: Tris-HCl
        DTT
        BSA
      Duration
        Check reagent instruction
        Star activity
          long time/high conc of enzyme/glycerol…
          Fast-RE
  DNA modifying enzymes
    Polymerase
      Polymerase I
        5’-3’/3’-5’ exocuclease
        Replace DNA chain with labeled chain
      Klenow Fragment
        No 5’-3’ activity
        Fill in gaps between labeled dNTPs in a new chain
      Taq enzyme
        Thermal stable
      Reverse transcriptase
        Make cDNA
    Nuclease
      Types
        Endonuclease
        Exonuclease
      RNase
        H
          Hydrolze RNA in D/RNA hybrid
          RT/primer
        A
          Hydrolyze C-U of RNA in DNA sample
    End-modifying
      Terminal transferase
        Add same nt in 3’ end
        Add tail/sticky end
      Alkaline phosphatase
        Remove 5’PO4
        Avoid vector self-ligation
      Poly nt kinase
        Exchange labeled ATP in 5’
  DNA ligase
    Mechanism
      Add ATP/NAD to 5’PO4 and 3’OH attacks
      Connect sticky ends
    Condition
      Temp: 37 Celsius
      Vector:DNA=1:3~10
      Maybe phosphatase
```

# Chapter 3 获取目的基因

1. 掌握gDNA 文库构建方法和原理(计算)
2. 掌握cDNA文库构建方法，特别是cDNA两条链的合成过程
2. 了解基因的化学合成法
4. 了解基因组和碱裂解法质粒DNA提取的步骤原理

```mindmap
Chp 3 Obtaining Target Genes
  From genomic/plasmid DNA
    Genome: isolation
      研磨+裂解液
        吸附柱+漂洗洗脱
        酚+氯仿，醇沉淀
    Plasmid: alkaline isolation
      Resuspension
        Glucose, RNase, EDTA
      Lysis
        NaOH, SDS
      Neutralization
        High salt HAc buffer
        Plasmid renaturation
  From genomic/cDNA library
    Library
      Into fragments, into vectors, into host
      Complete, stable
        capacity              clone number
    Genome (gDNA)
      
      Steps
        Extract genomic DNA
        Partially digestion
          Choose enzyme and time
          Pick fragments whose length fit the vector
        Insert into vector and transform
        Screening
          With nucleic acid probes/antibody (Replicate to NC membrane)
          With resistance gene
      gDNA lib Signigicance
        Stable storage
        Enrichment and amplification
        Genome profiling and find unknown genes
    cDNA
      Steps
        Extract mRNA
          Affinity chromatography: oligo-dT(poly a tail) cellulose
        Synthesis of cDNA
          template chain
            Oligo dT primer
            Random primer
            Gene specific primer
          2nd strand
            method1
              remove RNA
                RNase H
              coding chain
                3’ folds back as primer
                S1 nuclease cut hairpin
            method2
              No removal
              Gene specific reverse primer
              Or add poly C oligo-dG as primer
        Construction
          Digestion into fragments, insert into cosmid, package into phages
        Screening
          Same
    Insertion into lambda
 phage vector
      Features
        Both genomic and cDNA
        Better (bigger) than plasmid
          ~20kb
        Only one fragment is packaged in one phage
      Steps
        Fragments digested with RE
        Same RE for linearized lambda vector
          Single: insertion
          Double: replace some original sequences
            Capacity
            BamHI
          Linearize: for packaging
        Ligation
        Get packaged, separated by cos site
          Units may concatenate during ligation, need in vitro cleavage
          Which is not involved in fragment insertion
      Cosmid also ok
        With resistance genes
        35~45kb
  PCR
    Direct clone target gene
  Chemical synthesis
    solid phase 亚磷酸三酯法
    Purification: HPLC, etc
    Application
      <150nt. as oligo nt probe/primer
      Assembly into gene
        Ligation based
        PCR based: overlap region
  Summary
    Known sequence: PCR, synthesis(both commonly used), library
    Unknown sequence: genome, library
```

# Chapter 4 PCR

1. 掌握PCR的原理、条件、影响因素
2. 掌握几种常见类型的PCR的原理及应用
2. 了解PCR技术在各个领域的应用

```mindmap
Chp 4 Polymerase Chain Reaction
  History
    How to clone? Amplify in vitro?
    Mullis
  Principle
    Cycle
      High temp, denaturation
      Low temp, annealing
      Middle temp, extension
    Exponential amplification
    Feature
      Specific
      Sensitive
      Fast & Easy
  Conditions
    Components
      Polymerase (after engineering)
        Thermal stability
        Fidelity
          Pfu, 3’-5’ cut, but slower
        Efficiency
        Specificity
      Primer
        Pair with conservative region
        Not homologous to other region
         15~40bp
          >19bp for specificity
        Random bases, GC 50~60%
        Avoid 2ndary structure/pairing
        3’ strictly right
        0.1~0.5 micromol/L
          High conc: low specificity
      Template
        100micromol/L
        Without NAses, DBP,…
      dNTP
        Same conc
      Mg2+
        0.5~2.5millimol/L
      Novel
        GC enhancer
        with loading
    Control
      Denaturation
        94 celsius, 30s
      Annealing
        T_a=(A+T)              2+(G+C)              4-3(~5)
        30s
      Extension
        Calculate from length and enzyme
      25~35 cycles
    Complex template
      Unspecific
        eg: genome
      GC high
  Various types
    Asymmetric PCR
      Primer conc 1:50
      Make ssDNA (probe)
    Reverse PCR
      Reversed primer
      Explore outside the known sequence  (eg:chromosome)
    Labeled primer (LP) PCR
      Labeled primer
      Gene diagnosis
      Many at a time
    Multiplex PCR
      Multiple pairs of primers at a time
      Balance
    Anchored PCR (solid phase)
      Biotin-labeled primer
      Shortly attracted to avidin-labeled matrix
      Amplify clusters, then add probes
    in situ PCR
      Pathological slices
        Permeability
      Localize target DNA
    OE PCR
      Overlap extension
      Primer design
        Add seqs that pairs with another target gene
      2nd PCR concatenates the target genes
    Touch down PCR
      Start with Tm+10
        Promote specificity
      Every 5 cycles -2
    RT-PCR
      Reverse transcribe and remove RNA
    RT-qPCR
      Real time
        Detect fluorescence every cycle
        Do not need annealing (accurate replication)
      Fluorescence
        eg: SYBR green, only binds dsDNA
        eg: TaqMan
          Bind on ssDNA, when polymerase passes, quenching is released
          High specificity
      Quantitative
        Ct: cycles to reach threshold
          Bigger, fewer template
        Absolute: make standard curve
          
        Relative (differential expression)
          
  Applications
    Research
      Cloning
      Sequencing
        Sanger
        2nd
        Genome
    Diagnosis
      Deletion, insertion, mutation
      ASO: allele specific oligo nt
        See heterozygosity
      VNTR: variable number of tandem replica
        Huntington
    Tumor
      PCR RFLP: restriction fragment length polymorphism
    Medicolegal
    Archaeology
      Evolution
```

# Chapter 5 载体和重组策略

老师总结的

```mindmap
RE based methods
  Traditional RE cut & Ligase ligation
  Complicated &sequence dependent
  One fragment ligation once
BioBricks
  Standard set of restriction enzymes
  Step by step
Golden Gate
  Type IIIs REs that cleave themselves out
  Assembly of several fragments in designed order one time
  Limited overlapping adaptor
Extra sequence based method
  More treatments more complicated
  Rarely used currently
PCR based method
  Assembly via PCR
  Unspecific products especially long and multiple fragments
Recombination based methods
  Specific & high efficient
  Multi-fragments assembly in one step
Gibson
  Chewback to create long overlaps
  Multi-fragments assembly in one step 
  Secondary structure of overlap
```


完整都

```mindmap
Chp 5 Vectors and Recombination
  Overview
    3 elements of vector
      Replication origin
      Antibiotics resistance gene
      Multiple cloning sites
    Also requires
      Stable
      Small
    Capacity: plasmid<lambda<cosmid<BAC/YAC
  Cloning vectors
    Plasmid
      Properties
        Configuration
          L, OC, SC
          Electrophoresis position difference
        Negative regulation of replication
          Iteron: RepA binds DNA
          Antisense RNA: Rop stabilize RNA binding
        Type
          Stringent
            Replicate with chromosome
          Relaxed
            Free and multiple copies
        Exclusiveness
          Same replicon structure, compete for proteins
        Antibiotics
          mechanisms
            Cell wall
            Ribosome
            ...
          Resistance
            Modification
            Degradation
            Transporter
        Capacity
          A few kb
      Examples
        pSC101
          First one
        pBR322
          2G, small, more copies, double resistance
          Rop target partially deletion
        pUC18/19
          Now, cloning vector
          Rop mutation, 500~700 copies
          LacZ alpha insert inactivation in MCS
          AmpR
        pET28a
          Now, expression vector
          T7 expression system
            Host: E.coli BL21
            With purification tags
            IPTG inducible
              Controllable!
          Lower copy number
        Shuttle vector
          E.coli and yeast
            Build and amplify in bacteria
            Express in yeast
          With both their ori
          Different selection tags
      Add gene database
    Bacterial phage
      Lambda vector
        Configuration
          Usually cyclic (via cos site)
          Ready to package in the host: linear
        Modification
          Insertion inactivation
            cI: clear plaque
            LacZ’: white
          Replace irrelevant region with MCS
        9~22kb
        See chp 3 also
      M13 vector
        Features
          ds cyclic
          Only (+)DNA is greatly replicated and packaged
          Never lyse bacteria
        Similar modification
        Bidirectional polylinker MCS
          clone both strand, but only package +DNA, need more -DNA as template to make ssDNA probe, or sequencing?
    Cosmid vector
      Lambda cos site+plasmid
      Enhanced capacity and efficiency
        Shorter seq than lambda
      Easy to screen (eg: TetR)
      See chp 3 also
    BAC & YAC
      Larger vector
      pYAC4 features
        ARS and E.coli ori
          Use in yeast
        URA3, AmpR
        SUP4
          Insertion inactivation: become red
        still need
          Telomere
          Centromere
        0.5~2Mb
      pBeloBAC11
        ~300kb
  Recombinant strategies
    RE cleavage-ligation
      Directional cloning
        Double digestion
        Single digestion
          sequencing using USP
          To check if reversed
      Biobrick ligation
        Known RE site, just ligate
        Multiple steps (different RE)
      Golden gate
        See chp 2 type II RE
    Extra tail sequence based
      Add paired homopolymer on vector and insert
        For blunt end. RE may cleave first
      Add linker with RE site to the end of insert
        Makes sticky ends
        High conc synthesized linker
      Add adaptor with sticky ends to the end of insert
      TA cloning
        Taq product A at end+vector T at end
      Rarely used
    PCR based
      OE PCR
        Yyds!
        See chp 4
      SLIC
        T4 polymerase generates 5’ overhang on linearized vector (digest 3’)
          insert, then transform
        No RE/ligase
        Uncontrollable
      Gibbson assembly
        Steps
          Make overlap (like OE PCR?)
          T5 exonuclease chew back 5’ (3’ overhang)
          15~20 overlap seq pairs, cannot chew at 50 celsius
          then repair by polymerase/ligase
            Transform
        Features
          Many genes at a time
          Digest and ligate at a time
      Maybe unspecific
    Transformation based
      Yeast, auto-assemble many overlapping DNA fragments
      Specific and efficient
      Synthesized Mycoplasma genome
        First Gibson then transformation
  SnapGene usage
```



# Chapter 6 基因的转移和检测

- 掌握基因转化、转染及转导
- 掌握重组体的鉴别方法
  - 遗传检测法(抗生素筛选/营养缺陷型筛选/插入失活)
  - 物理检测法 (酶切/PCR鉴定)
  - 核酸杂交筛选法
  - 免疫化学检测法(标记抗体探针/免疫沉淀)

```mindmap
Chp 6 Transfer and Identification
  Transfer
    Transformation
      Competent cells
        Preparation
          CaCl2
            Ca2+,4 Celsius, glycerol, -70 Celsius storage
          Electroporation
            Make a hole on it
            More fragile
      Operation
        4 Celsius, 30min
        42 celsius, heat shock 90s
        37 celsius, resuscitation复苏
        Spread plates
    Transduction
      Bacteriophage DNA
      in vitro packaging
        head+tail+envelope+DNA
        From amber mutant
        Limit: 75~105%
    Transfection
      Mammalian cells
      Types
        Polymer
        Optoperforation
        Lipid mediated
        Viral infection
        Electroporation
        Microinjection
        Gene gun
  Identification
    Genetic
      Not distinguish empty vector
        Antibiotic resistance
        Auxotrophic营养缺陷 selection
      Insertion inactivation
        eg: bacteria, alpha/beta galactosidase, X-gal, insert—white
        eg: phage, cI, insert—clear plaque
        eg: yeast, sup4, insertion—red
    Physical
      Restriction profile
      Reversed? Different length…
    DNA
      (in situ) hybridization
      NC membrane, NaOH
    Immunechemical
      Labeled antibody for product
      Immuno precipitation
        Maybe lyse bacteria in situ to see the ring
        Maybe extract and CoIP or WB
   genetic engineering
```



# Chapter 7 原核细胞基因工程

1. 原核基因表达的元件/基本转录单元包含的元件（启动子，SD序列，编码区，终止子）
2. 提高原核表达效率的方法
3. 常见表达类型（融合表达/分泌表达/IPTG诱导表达） 
3. 原核细胞基因工程的应用（重组胰岛素/人生长激素）

```mindmap
Chp 7 In Prokaryotes
  Structural elements
    DNA structure
      Upstream regulatory region
        Controller
          enhancer, operator
        Promoter
          Transcription start
        Translation start site
      Coding sequence
        Prokaryotes: polycistron
        Eukaryotes: monocistron, splicing
      Downstream region
        Translation stop site
        Terminator
          Transcription stop
    Promoter
      Essential for transcription level control
      Structure
        -35 bp RNA-pol recognition
        -10 bp unwinding region
      Expression types
        Constitutive
          no operator, always on
        Inducible
          activator/repressor, inducer 
    Commonly used promoters
      Basic
        Plac
        trp
      PlacUV5
        No cAMP control
      Ptac/trp
        -35 Ptrp and -10 Plac
        Strong hybrid promoter
      T7
        BL21, IPTG dual inducing
          IPTG first induce T7 polymerase expression
          T7 pol then helps express genes following T7
        Advantage
          Strong and universally used
          Reduce leakage expression
      Lambda
        Phage, P_R/L: left/right
        CIts857: temperature-sensitive, 42 degrees P_R/L on
      P_BAD
        Arabinose
      Ptet
        Tetracycline
        Negatively inducible
      HIF-induced promoter
        Hypoxia inducible
    mRNA structure
      Ribosome binding site
        Prokaryotes
          SD seq/RBS   N   a   m   e
          5~9bp before start codon   P   o   s   i   t   i   o   n
          AG rich   R   e   m   a   r   k
        Eukaryotes
          Containing initiator codon   P   o   s   i   t   i   o   n
          Kozak seq   N   a   m   e
      Terminator
        Rho-dependent
          rut site, rho pushes
        Rho-independent
          Terminating hairpins
    Hosts
      DH5alpha
        Plasmid cloning
      BL21 (DE3)
        Protein production
  Factors & Improve efficiency
    Transcription
      Promoter structure: -35 & -10
        High: if similar to consensus seq
        Interspace 16~17, >17 means low
      Distance between promoter and initiator codon gene ATG
        Lower if farther, generally
      Distance between SD seq and initiator codon AUG
 and sequence itself
        A,G-rich seq 5~9bp upstream the AUG
    RNA processing
      2nd structure
        Affects SD seq shape—recognition
      Transcription terminator
        Prevent unnecessary transcription read-through and unexpected 2nd struc
    RNA stability
    Translation
      Copy number
        Higher expression if more
        But not always good
      Codon optimization
        For the host
      Lighten metabolic load
        Induced plasmid replication/expression
        Only when needed
        e.g. heat, IPTG, light, HIF
      Protein stability
        Fused expression
        Secretory expression
        Engineer the host to inactivate protease
    Post-translation
  Expression and plasmids
    Normal
      Insert into MCS
      Pay attention to the distance to SD
    Fusional
      MCS inside lacZ
      Avoid frameshift mutation
      LacZ residues does not matter activity; or cleave them
    Induced
      IPTG
        Lactose analog, not metabolized, continue!
        OD=0.4~0.6, c=0.05~1mM
      Temp
        CI: temp
    Secretion
      Add bacterial signal peptide before the insert
        Later cleaved
      Not all can!
    Issues
      pBR322 or Ptac, pET28 series
      Purification tag
        GST-GSH/His-Ni-NTA/Ab-Pro A
        凝血酶/Xa cleaves
      Inclusion body
        Too much protein does not fold, rather precipitates, no activity!
        Slow down: low temp/copy number/inducer,…
  Application
    Human insulin
      Old methods
        Two chains separately: degradation
        Both chains fused with Gal and cleave
          Low disulfide correctness
      New methods
        Yeast; the pro insulin
    Human growth hormone
      Non-secretory: replace the first few residues in cDNA with sth else
      Secretory: replace with bacterial signal seq
    Minimolecular Antibody
      Fab, Fv, ScFv, single domain Ab, minimal recognition unit (one CDR)
      Advantages
        Low cost, good permeability, low immunogenicity, easy to excrete, conjugate with other molecules
        Do not need glycosylation, E. coli is ok
      Issues
        Bacterial signal: 15~30 aa
          Fab/ScFv
          Lower production
          But inclusion body: refolding is required
        Sc (linker), 10~15 aa, like (GGGGS)_3
          OE-PCR
```



# Chapter 8 酵母基因工程

- 酵母基因工程的载体类型、特点及用途
- 酵母常用的选择性标记及筛选原理
- 互补法克隆/筛选酵母基因
- 酵母基因定向
- 酵母的应用（了解）

```mindmap
Chp 8 In Yeast
  Advantages
    Growth fast, 2h doubling time
    Small genome, easy manipulation
    Close to eukaryotes, PTM of protein
    FDA-approved, large-scale production
    Genetic analysis, 四个haploid孢子可分离
  Types of vector
    Shuttle vector features
      Both ori and selection marker
      Autonomous replication
    YEp
      2miu ori, need host protein
      Episomal游离基因的
    YRp
      ARS ori, independent
      Autonomous replicating sequence
      5~100 copies
      Replicating
    YCp
      ARS, with centromere, stable separation
      Low copy number
      Centromere
    YAC
      With CEN, TEL (telomere), SUP3+URA3
      Capacity: 0.5~2Mb
    YIp
      No ori, with homologous region
      have to integrate into genome, under selection pressure. 1 copy
    Selection
      Transformation efficiency, copy number: YEp>YRp>YCp>YIp
      Stability: C,I>E,R
    Uneven distribution, high loss rate
  Gene cloning and screening
    Gene transfer
      Lithium acetate, PEG
    Selectable markers
      HIS3, LEU2, LYS2, TRP1, URA3
    Gene cloning
      Complementary method
        Mutation in genome
        Gene in plasmid (library) recovers death
        Selection condition
      Examples
        LEU2
        Temp-sensitive related gene
      Effectively screen (related) genes from a phenotype observation (genomic library)
    Gene targeting
      Circular (plasmid): single cross-over/homology recombination
        Keep the one in the original genome
        
        Insert the whole plasmid into the genome
        2 types of integration: marker and YFG
      Linear DNA: double cross-over, transreplacement
        just replace the homologous gene
        One DNA chain one time, so double
        Higher probability than single
          yeast enzymes like linear ends
        Gene editing: knock-out/repair
    Tetrad analysis
      Targeting: may only change one chromosome
        Or may not study its function
      Split the 4 haploid spore cells and culture
      First select with marker, get the haploid with disrupted YFP, then inspect its function
  Applications
    Yeast two hybrid
      System
        Gal1 promoter, followed by reporter genes
        Gal4: BD (bait), fused with your interest AD (prey) fused with a library
      Operation
        Two plasmids, co-transformation
        Only when they are spatially proximate can transcription be activated
      Application
        Check interaction
        make mutant to study structure
        Find interacting proteins
    HBV vaccine
      Subunit vaccine, HB surface Ag (peptide)
      Transform DNA to produce HBsAg
        Glycosylation or not
    Natural product
      Transform enzyme into yeast
      E.g. fragrance, pharmatheuticals
    Signaling pathway
      Pheromone: stop growth, 接合
      Clone the supersensitive gene
      Transform a library into mutant strain
        Those still grow
        May also be GAP1
    Splicing study
      U2 RNA base pairing with intron
      Gene targeting
        Make one base mutant
        Mutate back/transform plasmid
      With pairing, a key enzyme his4 is correctly expressed
    Artificial chromosome synthesis
      Design
        Short fragments
        Redesign some functions
      Build
        Assembly
          In vitro, many rounds to assemble fragments
            Minichunk-megachunk
          In yeast, homologous recombination assembly
            Successive megachunk integration
            Meiotic mediated
        Details
          Overlap region
          Screening?
            eg: 要去掉的一段含致死基因
      Test
        Functional study
      Debug
      Studies
        Poco
```



# Chapter 9 哺乳细胞基因工程

- 哺乳细胞基因工程的筛选标记
- 基因转移方法
- 表达类型(提高哺乳细胞基因表达水平实例)
- 应用(tPA生产)
- 转基因动物(转基因鼠制备方法，转基因三文 鱼，克隆动物与转基因动物区别)

```mindmap
Chp 9 In Mammalian Cells
  General
    Host
      CHO
      HEK 293
    Advantage
      Folding, PTM
    Shortcomings
      Poor manipulation
      Medium requirement
      Slow growth
  Selection marker
    营养缺陷型
      HAT medium
        氨基蝶呤：阻断从头合成
        次黄嘌呤：补救途径原料
        胸腺嘧啶：补救途径原料
      Genotype
        host: tk minus
        Vector with tk
        Only with thymidine kinase can host grow
    Antibiotics
      Medium with G418: inhibit ribosome
      Vector with aph gene, transfer a PO4 group to inactivate it
  Gene transfer
    Glucan
      Positive-charged DEAE complex
      Endocytosis, early, low efficiency
    Ca-PO4
      coprecipitation on the surface, endocytosis
      100 times better
    Electroporation
      Mammalian cells are more fragile
      High conc of cells and DNA
    Lipofection
      Double-layer liposome coated DNA
      Membrane fusion, maybe toxic
      Much higher efficiency and reproducibility
    Virus-mediated
      Recombine DNA, pack virus, infect
        SV40, Adeno, …
      Very high efficiency, for those hard to make
      Yet high cost/long time
    Other
      Microinjection
      Optoperforation
  Expression system
    SV40 viral vector
      Recombinant vector
        Late promoter?
          Late genes removed?
        Remove bacterial sequence
        Objective gene cloned into
      Helper plasmid
        Early region defective
        Late genes, assembly-related
        Spare the space in the main vector for longer objective gene
      Procedure
        Co-transfect the two plasmids
          Only when both are transfected can viruses lyse the cell
        Virus particles amplified in host cells
          Harvest
        Infect new host cell to produce protein of interest
          Why not lyse?
      Other similar
        SV40
          Only monkey cell! 293T   H   o   s   t   ,       p   a   c   k   a   g   i   n   g       c   e   l   l
          1 helper   P   a   c   k   a   g   i   n   g
          Inside the host   W   h   e   r   e       i   s       v   i   r   u   s
          No   I   n   t   e   g   r   a   t   e       i   n   t   o       g   e   n   o   m   e
          Small   C   a   p   a   c   i   t   y
        慢病毒
          3 helper   P   a   c   k   a   g   i   n   g
          Released   W   h   e   r   e       i   s       v   i   r   u   s
          Yes   I   n   t   e   g   r   a   t   e       i   n   t   o       g   e   n   o   m   e
          <6kb   C   a   p   a   c   i   t   y
          All, 293T   H   o   s   t   ,       p   a   c   k   a   g   i   n   g       c   e   l   l
        腺病毒
          1 helper   P   a   c   k   a   g   i   n   g
          Inside the host   W   h   e   r   e       i   s       v   i   r   u   s
          All, 293T   H   o   s   t   ,       p   a   c   k   a   g   i   n   g       c   e   l   l
          No   I   n   t   e   g   r   a   t   e       i   n   t   o       g   e   n   o   m   e
          <8kb   C   a   p   a   c   i   t   y
        逆转录病毒
          No helper   P   a   c   k   a   g   i   n   g
          Released   W   h   e   r   e       i   s       v   i   r   u   s
          Mouse/Rat, Plat E   H   o   s   t   ,       p   a   c   k   a   g   i   n   g       c   e   l   l
          Yes   I   n   t   e   g   r   a   t   e       i   n   t   o       g   e   n   o   m   e
          <6kb   C   a   p   a   c   i   t   y
    Types
      Transient expression
        Without selection pressure, most lose plasmids in 48 hours (in mammalian cells
        Short range, yet high level
        Useful in: identifying initial and fast processes like RNA splicing
      High-level transient expression
        Shuttle vector
        Strong CMV promoter
        SV terminator and poly A
        Intron seq of globin
          Enhance RNA transport into cytosol
      Stable expression
        Packaging cell
          Retroviral vector DNA
            Foreign gene and LTR 长末端重复序列
            That will be integrated into genome
            Transcripted into RNA as genetic material
          Also its packaging protein
            Engineer the host
          Produces recombinant virus
        Host of interest
          Reverse transcription
          Everything between LTR is integrated
      Efficient expression
        Gene amplification
          Foreign gene linked with dhfr gene
            into dhfr-negative host
            in nucleoside-free medium
          Add inhibitor Mtx甲氨蝶呤, increasing conc
          Forced to increase the copy number of the plasmid: directed evolution
        COS cell
          Vector has SV40 ori
          Host expresses T Ag that is required for ori
          Produces hundreds of thousands of copies
          Accumulating enough protein before the cells lyse
        Vaccinia牛痘
          Vaccinia
            Close the expression of host proteins
            Express T7 polymerase
            Hard manipulation due to large genome
          A vector
            T7 promoter followed by objective gene
        Baculovirus杆状病毒
          High envelope protein expression
          Replace with objective gene by HR
          The plaque of recombinant virus looks different
          Collect and infect a fresh culture
  Applications
    Production of tPA, an enzyme to dissolve thrombus. Mtx-dhfr method
    Production of mAb
  Transgenic animals
    Mouse
      Microinjection
        Random integration
      ES cell method
        From blastocyst胚泡
          Culture on feeder layer
          With differentiation inhibitor
          Inject back into (another) blastocyst
        Gene targeting/screening
          Vector
            aph gene inserts and interrupts the gene to be knock-out
            tk in the end of gene to be targeted
          Double screening
            Positive
              If non-homologous recom, tk is integrated
              GCV kills the cell
                Phosphorylated and interferes DNA replication
            Negative
              If not integrated, G418 kills the cell
            
        To obtain pure blood mouse
          Chimeric mouse hybrids with wt
            to get Bb and bb
          Bb hybrid to get BB
      Application
        Disease model: cancer, AD, etc.
        Super mouse: rat growth hormone
    Salmon
      Growth hormone gene
        Much bigger
      Antifreeze promoter
        Make sure it works
    Monkey
      Retroviral gene transfer into an unfertilized egg, integrated
      GFP, to prove this works
      Disease model
    Pigs
      Knock out GGTA1半乳糖基转移酶
      To reduce transplant rejection
    Genetically modified pets
    Sheep
      Bioreactor (microinjection) produce proteins in the milk
      Cloned sheep: somatic cell nuclear transfer
      Other cloned animals
```



# Chapter 10 植物基因工程

1. 植物再生方式(原生质体法，叶盘法)
2. Ti 质粒介导的基因转移方式 Ti质粒的特性及其如何引发冠瘿瘤的形成? Ti质粒如何改造成基因工程载体?(共整合/二元载体系统)
3. 转基因植物(转基因烟草、抗虫棉、抗除草剂植物、转 基因番茄、黄金大米)

```mindmap
Chp 10 In Plants
  General
    Advantages
      Many traits
      Powerful regeneration
      Many offsprings
      自交
    Disadvantages
      Large chromosome
      Unstable inheritance
      Hard for 单子叶植物
  Regeneration of plants
    全能性：from a single cell to a complete plant
    Titopotency
      More differentiated, less
      Plant > animal
    Process
      离体培养+营养+激素=全能性
      脱分化形成愈伤组织
      再分化形成胚状体，再生长为植株
      Controlled by the ratio of auxins/cytokinins
        High: root; low: stem/shoot，茎/新枝
    Approaches
      From protoplasts
        Cut leaves into pieces
        Soak in solution with cellulase
          Dissolve the cell wall
        Centrifuge to remove debris
        Transfer genes into protoplasts
        Transfer on the feeder cell/agar layer
        First high cytokinins, then low auxin
        Finally into soil, 8~10 weeks, long and verbose!
      Leaf disk叶盘再生法
        Make leaf disks and incubate with Agrobacterium carrying the plasmid
          No protoplasts required
        Transfer to filter paper over nurse cells
          Similar
          But only 2~3 days!
        Induce shoots, roots, into soil,…
  Ti plasmid and plants
    Structure
      T-DNA
        Transfer
        Express
          Auxin, Cytokinin
          Opine冠瘿碱
        With left/right border: cleavage site
          ~25bp repeat
      Vir region
        Virulence, genes helping with transfer
      Con region
        Conjugation
      Ori region
        Replication
    Opine
      Various kinds of alkaloid
      Nutrient for Agrobacterium, not for plants
      Induces conjugation with plant cells
    Effect
      Infect the plant through wounds
      Induces cell growth to make a tumor
      Let plant cells make nutrients for them 
    Transfer
      Wound factors released
      vir A/G is expressed and activate other vir genes
      RB, LB is cleaved, releasing a ss T-DNA
      Enters plant cells through 接合的位点 (pores?)
      Integrate into genome randomly, multi-copy
  Gene transfer
    Ti plasmid-mediated
      Co-integration
        Shuttle vector
          pBR322 based
          T-DNA
            For HR
          Inserted gene of interest
        Recombination
          Mate with Agro, transfer through 性菌毛
          HR through the T-DNA region
          The whole vector incorporated into Ti-plasmid
          Such a big vector!!
        Selection
          AmpR: into E. Coli (the yellow one in slides)
          Those not incorporated into Ti does not have ori in Agro
          NPT II: in plant, add PO4 for Neo/Kan
      Binary vector system
        Main
          pBR322 based
          YFP, NPT II between T-LB and RB
          Agro (A.t) ori, AmpR
        Helper
          All vir genes. Already in A.t
        Process
          Construct and screen in E.coli
          Only main, similarly get into A.t and plant
          Trans complementation
      GUS reporter gene
        CaMV花椰菜花叶病毒 promoter
          Always used
        GUS: 葡萄糖醛酸糖苷酶
          Cut its substrate to give colorful products
          E.g. X-gluc: blue
        May be along with YFP
          To test promoter activity
          To study tissue-specific expression
    Gene gun mediated
      For monocotyledon单子叶植物
      flow
        Precipititate prepared plasmid on particles
        Shoot them into cells/tissue, regenerate the plant
  Applications
    Plants
      Transgenic tobacco
        Express TMV coat protein
        Anti-TMV (and some others related)
      Anti-pest plants
        Bt苏云金芽胞杆菌 toxin
          Active form binds intestinal receptors
          No harm to mammals
        To boost production
          Duplicated CaMV promoter
          Synthetic coding region
            Codon optimization
            Remove unused C terminal
        Other
          Disease-resistant, high production
      Herbicide-resistant plants
        e.g. 草甘膦-EPSPS
        Strategies
          Express more target enzymes
          Replace target with mutant
            Bacterial EPSPS is insensitive
            CaMV and chloroplast-targeting seq
          Express resistance enzymes
            Degrade or inhibit
      Transgenic tomato
        Transfer antisense PG gene to silence PG
        PG果胶酶
          抑制，抗软化, for transportation
        C2H4乙烯
          For storage
          SAM, ACC, EFE, etc.
      Transgenic flowers
        Color, fragrance, shape, lifespan (C2H4)
    Products
      Ab
        Heavy/light chain transferred separately, and hybrid plants
        Plants easier to grow than mammalian cells
      Gloden rice
        Express key related enzymes (Psy modified) for beta-carotene synthesis
        胚乳-specific
      PHA聚羟基酸
        Biodegradable/compatible
        Key enzymes, including PHA synthase
    CRISPR and genetic/functional study
```



# Chapter 11 基因编辑

```mindmap
Chp 11 Genome Editing
  Basics
    Molecular scissors
      Insert, delete, replace
    All about DSB repair
      NHEJ
        Loss of several bases
      HDR
        Precise repair?
    System
      Recognition
      Cleavage
        No selectivity
      Provided DNA
  ZFN
    Zinc Finger Nuclease
    Mechanism
      Structure
        NLS
        DNA recognition domain
          Tandem zinc finger domains
          30 aa, Cys2His2-Zn each
          3 residues recognize 3 bases
            Usually GNN
          Another one residue on the other strand
            no specificity
        Cleavage domain
          Fok I activated only after
          Non-specifically dimerization
      Action
        3~6 ZF domains binds 5’-3’ on both sides of the site
        5~7 bp spacer sequence for Fok I between the nearest ZFN-binding site bases
      Design
        Target DNA seq->ZFP aa seq->ZFP DNA seq
        Add NLS and Fok I sequences
        Linker length determines which base is most efficiently cleaved!
    Limitation
      Seq requirement: appropriate G
        can design
      Kind of off-target
        Tolerate mismatch
          Non GNN
        heterodimer, only when both chains match
    Application
      HIV: knock-out CCR5 in lymphocytes
      杜氏肌营养不良: early stop codon
      唐氏综合征: duplicated Chromosome 21
  TALEN
    Transcription activator-like effector nuclease
    Mechanism
      Structure
        DNA recognition domain
          33~35 aa repeat units 
          No. 12~13 aa, RVD (residue variable dimer)
            NG->T
            HD->C
            NI->A
            NN->G/A
          Recognizing one specific nt
        Cleavage domain
          The same Fok I
      Action
        14~20 ZF domains on both sides of the site
        12~20 bp spacer sequence
      Design
        Target DNA seq->TALE aa seq->TALE DNA
        Similar
        Too long, may use GoldenGate to assemble
          ZFN may not need
    Comparison
      Specificity
        TALEN better
      Off-target&toxicity
        TALEN lower
      Workload
        TALEN bigger
    Applications
      Super-muscly pig
        Inactivate 肌肉生长抑制素 transplant into 卵母细胞
      Disease model, transgenic animals, etc.
      Change Fok I to activator?
  CRISPER
    Clustered regularly interspaced palindromic repeats
    Native system
      Immunity of bacteria
      Abbreviations
        crRNA: CRISPR RNA
        tracrRNA: trans-activating …
        NUC: nuclease lobe
        REC: recognition lobe
        PAM: protospacer adjacent motif
        DSB: double strand break
      tracrRNA: complementary pairing with repeats
      CRISPR-associated proteins
        A series of proteins
        Involved in adaption, expression, interference, assistance
        Mainly using nuclease
          Need guide RNA
          No dimerization required
        Cas9
          HNH domain
            Scissoring the complementary strand
          RuvC domain
            Cuts the other strand
          PAM-interacting sites
      Leader
        Regulation: only when infected
        Between CRISPR and Cas
      CRISPR array
        Components
          Repeats
            21~48bp
            Complement to tracrRNA region
          Spacers
            26~72 bp
            Recognize target gene
        Function
          Captured from invading virus/phage
          Cleaved into short fragments
          Secondary infection: fast reaction
    CRISPR-Cas working
      crRNA biogenesis
        CRISPR array transcribed into pre-crRNA
          a long chain
          tracrRNA binds on every repeats
        RNase III cleaves it into fragments
          Separate spacers
          Trim 5’ of crRNA
        Engineered system
          sgRNA: linking the two RNA molecules
          Guide RNA: sg or cr/tracrRNA
      DNA interference
        tracrRNA-crRNA recruits Cas 9
          Stablize the structure!
          Conformational change
          Pre-structuring PAM-recognition site
        Cas9 recognizes PAM sequence
          That should not exist in the bacteria genome
          For commonly used Cas9, PAM is NGG
            One in ~8bp in human genome
            Usually you will see it
          If no PAM, the complex collapses, Cas9 leaves
        crRNA invades the dsDNA, causing melting
          ~20nt pairing required
        NHN and RuvC domain makes a nick in each strand
          ~3bp from the PAM
    Applications
      Similar but more powerful. Advantages
        Easier to build (smaller system)
          lower cost
        Higher specificity/efficiency
        Many sites simultaneously
      HDR
        Repair dysfunctional genes
        Knock-in: add donor gene, with homologous DNA on both sides, to replace the original seq
      NHEJ
        Random indels
          Knock out
          Make mutations
      Gene targeting
        Inactivated HNH/RuvC
        Precise activation/silencing
          Activator/repressor
        Imaging/specific probe
          Fluorescence protein
        DNA modification/base editing
          Methylase/Deaminase
        RNA targeting
        NA test
          Recognize specific NA, cleave and give a signal
      Lower off-target effect
        Inactivate one of the cleavage domain
        Need two Cas9 (two gRNA) to make DSB, like the previous two
        Spacer: ~4bp
  NgAgo
    Reported “advantage”
      DNA-guided, more stable
      PAM-independent
      Lower off-target effect
    Some merits
      Engineered enzyme that enables editing in physiological temperature
      Maybe it can knock-down genes?
```



# Chapter 12

1. 了解几种常见基因疾病的基因诊断方法
2. 了解不同层面(DNA/RNA/protein)上的基因治疗方案 和原理

```mindmap
Chp 12 Gene Diagonsis  and Therapy
  Diagnosis
    Three basic strategies
      RFLP
        Associated with specific RE site
        Eg: sickle-cell anemia
          CCTGA(T)GG
          2 alleles, hetero/homozygote
      PCR
        Copy number variation
        Eg: Huntington’s disease
          IT15 gene, CAG repeats
          Normal: 11~34; aggregation: 42~100
          Oligo peptide primer, watch the length distribution of PCR products
        Or? Cut the minisatellite region, PCR, Southern and run gel, to check the length.
      Probe
        Small number of indels, no CNV
        Eg: cystic fibrosis
          CTFR loses a Phe, 3nt
          Two ASO probes for wt and mutant
          2 alleles, hetero/homozygote
    DNA fingerprint
      RFLP of some polymorphous regions
      Uniquely identify a person
      Paternity test/Criminal..
  Therapy
    DNA level
      Gene therapy
        edit the gene and inject back cell
      Methods
        Transfer, like retroviral vector
        CRISPR
      Eg: SCID, ALL (edit造血干细胞)
      Usually somatic. No germline.
    RNA level
      Antisense RNA
        A RNA that pairs and blocks
      RNAi(nterference)
        dsRNA like siRNA
        Pairs, maybe cause degradation
      Ribozymes
        Cleaves mRNA at specific site
      Usage
        Transfer gene encoding that RNA
        Antisense/interfere: anti-virus/tumor
    Protein level
      CAR-T
        Domains
          Extracellular: ScFv, targeting Ag
          Transmembrane: send the signal
          Co-stimulation: 4-1BB/CD28 domain
          More stimulation: regulates specific response
          ITAM: CD3 zeta, recruit downstream proteins
        Flow
          Isolate T cell, transfection, inject back
      PD-1
        mAb that inhibits this immunosuppression
```



