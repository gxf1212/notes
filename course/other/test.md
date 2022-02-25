

## test

### json放弃了，太复杂

```mindmap json
{
	"name": "Genetic\\nEngineering", 
	"children": [
	{"name": "Course syllabus", "children": [{"name": "lalalalala"}]}, {"name": "Techniques", "children": [{"name": "Gene editing"}, {"name": "Detection & Diagnosis"}]}]}
```

already good structure!

```mindmap json
{
	'name': 'Genetic\\nEngineering', 
	'children': [
	{'name': 'Course syllabus', 
	'children': [
	{'name': 'lalalalala'}]}, {'name': 'Techniques', 'children': [
	{'name': 'Gene editing'}, {'name': 'Detection & Diagnosis'}]}]}
```

### eg


```mindmap json
{
  "name": "root2",
  "children": [
    {
      "name": "children1",
      "children": [{ "name": "subchildren" }]
    },
    {
      "name": "children2",
      "children": [{ "name": "subchildren" }]
    }
  ]
}
```

must use json for dictionary

normal:

```mindmap
root
  children1
    subchildren
  children2
    subchildren
```

### markdown

```mindmap
# Genetic Engineering
  Chp 1 Preface
    Opening
    COVID-19
```

即可

处理markdown文本，#换成缩进，*是七级标题（solved

再缩进再加（读的时候不要strip空格，还要检测空格。。），还有强制换行的（倒序读取写入？）

开头空格无所谓

设计者应该是把空两个作为一个tab的

中文被自动忽略（其实GBK能看到）



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

