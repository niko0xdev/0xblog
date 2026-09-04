---
slug: agent-harness-eval-driven-sdlc
title: "Applied AI Series - Beyond Vibe Coding with Harness Engineering and Evals"
description: Shifts in AI coding from frontier models to harness engineering, and why Eval-driven SDLC matters for safe agent autonomy.
authors: [niko]
tags: [ai, ai-agent, coding-agent, harness, evaluation, sdlc, quality-engineering]
---

AI coding has evolved rapidly from code completion and chat-based assistants into autonomous agents capable of planning, implementing, testing, and iterating on software tasks for hours. As frontier models become increasingly capable, however, model intelligence alone is no longer enough to determine how useful an agent is in real-world software development. The surrounding **agent harness** (tools, environment, context, execution loop, verification, and feedback) is becoming just as important.
This changes another part of the Software Development Life Cycle (SDLC): **Quality Control and Evaluation**.
When generating code becomes fast and inexpensive, the difficult question is no longer only "Can the agent build it?". It becomes "How do we know what the agent built is correct?"
This article explores the evolution from the **frontier model race** to **harness engineering**, why verification is becoming a bottleneck for autonomous software development, and how **Eval-driven SDLC** can help teams safely increase Agent autonomy.

<!-- truncate -->

## Frontier Models Are Moving Fast
The first thing worth understanding is how quickly the frontier is moving.
Within only a few months, OpenAI, Anthropic, Google, and other AI labs have continuously introduced new generations of models with stronger coding, reasoning, tool-use, and agentic capabilities.
Benchmark scores keep climbing, but that is not the change that matters most.
Modern frontier models increasingly optimize for workloads such as:
* software engineering;
* tool use;
* long-running tasks;
* computer interaction;
* instruction following;
* self-correction;
* large-context reasoning.
The direction of travel looks roughly like this:

![Model capability progression from question answering to long-running work](/img/agent-harness-eval-driven-sdlc/01-capability-progression.png)

A model is no longer expected to simply produce a good answer.
An Agent must be able to:
1. understand a goal;
2. break it into smaller tasks;
3. interact with tools;
4. modify an environment;
5. observe the result;
6. recover from failures;
7. continue until the task is complete.
The distinction matters:
> **A strong model is not necessarily a strong Agent.**

## What is an Agent Harness?
An **Agent Harness** is the system surrounding a language model that allows it to perform work inside an environment.
A simplified Agent can be represented as:
```text
Agent = Model + Harness
```
The **Model** provides capabilities such as reasoning, planning, language understanding, and code generation.
The **Harness** provides the infrastructure that allows those capabilities to interact with the real world.
Typical components include:
* context and memory;
* tools;
* filesystem access;
* terminal execution;
* browser or computer interaction;
* sandbox environments;
* permissions;
* task state;
* execution loops;
* retries;
* observability;
* verification and evaluation.

![Model, harness, and the resulting agent](/img/agent-harness-eval-driven-sdlc/02-model-harness-agent.png)

A useful analogy is:
* **Model = brain**
* **Harness = working environment**
An intelligent engineer without access to the repository, terminal, tests, documentation, or deployment environment would not be very productive.
The same applies to an AI model.

## Why is Harness Engineering Important?
Frontier models are still extremely important, but the overall capability of an Agent increasingly depends on more than model intelligence.
A useful approximation is:
```text
Agent Capability
    ≈
Model
× Harness
× Context
× Environment
× Tools
× Verification
```
That is why the same model can feel like a different engineer inside different coding agents.
A harness decides:
* what information reaches the model;
* which tools it can access;
* how state is preserved;
* how failures are represented;
* when context is refreshed;
* when a task is considered complete;
* whether an action is allowed;
* how results are verified.
In February 2026, OpenAI published an engineering report describing an internal product built with **zero manually written code**.
According to OpenAI, after five months the repository contained approximately:
| Metric                     |                Reported result |
| -------------------------- | -----------------------------: |
| Code                       |               ~1 million lines |
| Pull requests              |                         ~1,500 |
| Initial engineering team   |                    3 engineers |
| Average throughput         |      ~3.5 PRs / engineer / day |
| Estimated development time | ~1/10 of manual implementation |
The interesting result is not the amount of generated code.
The important lesson was that the role of engineers changed.
Instead of primarily writing code, engineers increasingly worked on:
* designing the environment;
* specifying intent;
* creating tools;
* making application state visible to Agents;
* creating feedback loops;
* improving verification.
OpenAI also reported that, as code throughput increased, **human QA capacity became a bottleneck**.
This is where Harness Engineering connects directly with QC and Evaluation.

## The Rise of Agent Harnesses
Most major AI companies are no longer building only models.
They are also building systems around those models.
| Company   | Model Layer     | Agent / Harness Layer         |
| --------- | --------------- | ----------------------------- |
| OpenAI    | GPT             | Codex, Agents SDK             |
| Anthropic | Claude          | Claude Code, Agent SDK        |
| Google    | Gemini          | Antigravity and Agent tooling |
| DeepSeek  | DeepSeek models | DeepSeek Harness              |
A simplified architecture looks like this:

![Simplified agent harness architecture](/img/agent-harness-eval-driven-sdlc/03-harness-architecture.png)

A recent example is **DeepSeek Harness**, which uses an architecture based on the idea that:
> Everything is a plugin.
Models, tools, skills, sessions, storage, sandboxes, loops, and interfaces can be plugged into the same runtime.

![DeepSeek Harness plugin architecture](/img/agent-harness-eval-driven-sdlc/04-deepseek-harness.png)

The rapid developer attention around projects like this should not be interpreted as proof that one harness is technically better than another.
GitHub stars are **an attention signal, not a benchmark**.
But they are another indication that developer interest is shifting from simple LLM wrappers toward more complete **Agent infrastructure**.

## Does the Harness Really Improve Agent Performance?
Yes, and this is where recent research becomes particularly interesting.
### LongHorizon-Harness
Long-running Agents have a difficult state-management problem.
A typical implementation may keep all of the following inside an increasingly large context:

![Growing agent context problem](/img/agent-harness-eval-driven-sdlc/05-growing-context.png)

As the context grows, Agents may:
* lose track of progress;
* repeat completed work;
* propagate incorrect assumptions;
* incorrectly believe a task is finished.
The **LongHorizon-Harness** paper approaches the problem differently.
It moves task state outside the execution context and introduces a:

![Manage Execute Audit loop](/img/agent-harness-eval-driven-sdlc/06-manage-execute-audit.png)
> **Manage → Execute → Audit**
loop.

The key idea is simple:
> **Task state should only be updated after the resulting environment has been independently verified.**
The reported results are significant:
| Benchmark                        | Baseline | LongHorizon-Harness |
| --------------------------------- | -------: | -------------------: |
| Qwen 3.7 Plus · WeaveBench       |    51.8% |           **80.7%** |
| Terminal-Bench 2.1               |    69.7% |           **77.2%** |
| Qwen 3.7 Plus · OSWorld 2.0      |     2.8% |            **8.3%** |
| Claude Opus 4.7 · OSWorld subset |    20.0% |           **34.3%** |
The model did not need to change.
The execution architecture changed.
And one of the most important components of that architecture was:
> **Audit.**
In traditional SDLC terminology, we could also call this **independent QC**.

## Harnesses Can Also Learn From Failure
Another interesting paper is **Self-Harness: Harnesses That Improve Themselves**.
Instead of manually tuning the harness every time an Agent performs poorly, Self-Harness analyzes execution traces to find repeated failure patterns.
Its process contains three main phases:

![Self-Harness improvement cycle](/img/agent-harness-eval-driven-sdlc/07-self-harness-loop.png)
1. Weakness Mining
2. Harness Proposal
3. Proposal Validation

The paper reports the following held-out Terminal-Bench 2.0 results:
| Model           | Initial Harness | Self-Harness |
| ---------------- | ---------------: | -----------: |
| MiniMax M2.5    |           40.5% |    **61.9%** |
| Qwen3.5-35B-A3B |           23.8% |    **38.1%** |
| GLM-5           |           42.9% |    **57.1%** |
Again, the improvement does not come from training a more capable base model.
The harness learns from failures.
This leads to an important question:
> **What allows a harness to learn what went wrong?**
The answer is:
> **Reliable evaluation signals.**

## Why are QC and Evaluation Important?
As coding Agents become better at producing complex solutions, generation itself is becoming less of a bottleneck.
Verification is becoming more important.
The paper **The Verification Horizon: No Silver Bullet for Coding Agent Rewards** describes this directly.
A classical assumption in Computer Science is that:
> verifying a solution is easier than producing one.
For modern coding Agents, this relationship may increasingly break down.
An Agent can generate thousands of lines of code quickly.
But confirming that those changes correctly satisfy:
* user intent;
* functional requirements;
* security constraints;
* performance requirements;
* architecture constraints;
* UX requirements;
* compatibility requirements
can require substantially more work.
Conceptually:

![Generation outrunning verification](/img/agent-harness-eval-driven-sdlc/08-verification-bottleneck.png)

This creates a new engineering bottleneck:
> **Generation scales faster than human verification.**

## Why Passing Tests is Not Enough
Consider a simple requirement:
> Users should be able to export invoices to CSV.
A weak automated test might look conceptually like:
```text
Click Export
    ↓
File exists
    ↓
PASS
```
The Agent generates:
```text
invoice.csv
```
The test passes.
But the file could still contain:
* missing fields;
* incorrect totals;
* broken encoding;
* incorrect date formats.
The software passed the verifier.
It did not satisfy the original intent.
The problem can be visualized as:

![Information loss from intent to verifier](/img/agent-harness-eval-driven-sdlc/09-intent-loss.png)

Every verifier we create is ultimately an approximation of human intent.
This means:
> **Strong Agent + Weak Evaluation = Dangerous Automation**

## What is Evaluation in an Agent System?
Tests and Evals are related, but they are not identical.
A **Test** normally answers a narrow question:
> Does this implementation satisfy this condition?
For example:
```text
Given:
    expired access token
Expected:
    HTTP 401
```
An **Eval** asks a broader question:
> How reliably does this Agent + Harness perform this class of tasks?
An Eval might run hundreds of tasks and measure:
* completion rate;
* functional correctness;
* regression rate;
* number of retries;
* token usage;
* execution cost;
* latency;
* security violations;
* unnecessary file changes;
* human escalation rate.

![What an eval actually measures](/img/agent-harness-eval-driven-sdlc/10-eval-pipeline.png)

For Agent systems, we are rarely evaluating the model alone.
We are evaluating:
```text
Model + Harness + Environment
```

## Evaluation Strategies
Like re-ranking strategies in RAG systems, Agent evaluation can use several complementary approaches.
There is no single verifier that works well for every type of software task.
### 1. Deterministic Verifiers
Deterministic verifiers use machine-executable rules to evaluate an Agent's output.
#### Key Techniques
* Compiler
* Linter
* Type checker
* Unit tests
* Integration tests
* Schema validation
* Static analysis
* Security scanners
#### Pros
* Fast
* Cheap
* Repeatable
* Easy to automate
* Clear failure signals
#### Cons
* Only verifies what was explicitly encoded
* Can miss business intent
* Poor test design can produce false confidence
#### When to Use
Deterministic verification should generally be the first layer whenever the result can be checked programmatically.
For software engineering, this is one of the strongest advantages we have.

### 2. Environment and Scenario-Based Verifiers
Some behaviors can only be validated by executing the complete system.
#### Key Techniques
* Browser automation
* End-to-end tests
* API scenario tests
* Database validation
* Visual snapshots
* Performance tests
* Runtime logs and traces

![Environment and scenario-based verification](/img/agent-harness-eval-driven-sdlc/11-scenario-verifiers.png)

#### Pros
* Closer to real user behavior
* Captures integration problems
* Can detect failures invisible to unit tests
#### Cons
* More expensive
* Slower
* Infrastructure can introduce noise
* More difficult to maintain
#### When to Use
Scenario verification is especially important for user-facing features and changes involving multiple system components.

### 3. Model-Based Evaluators
Not every quality dimension can be expressed as a deterministic rule.
An LLM can act as a grader using a structured rubric.
#### Key Techniques
* LLM-as-a-Judge
* Rubric evaluation
* Requirement comparison
* Code review Agent
* UX evaluation
* Architecture review
Example rubric:
```text
Authentication implementation:
[ ] Uses existing authentication abstraction
[ ] Does not bypass middleware
[ ] Preserves public API compatibility
[ ] Handles token expiration
[ ] Includes regression coverage
```
#### Pros
* Can evaluate subjective dimensions
* Can understand context
* Useful when deterministic checks are difficult
#### Cons
* Non-deterministic
* Can be biased
* Can make mistakes
* More expensive than simple tests
#### When to Use
Model-based evaluation works well as an additional layer after deterministic verification, particularly for architecture, UX, code quality, and requirement-level checks.

### 4. Human Evaluation
Human evaluation remains necessary for decisions where intent, risk, or subjective judgment matters.
#### Key Techniques
* Product review
* QC exploratory testing
* Architecture review
* Security review
* Approval gates
#### Pros
* Closest evaluator to actual intent
* Can reason about ambiguous requirements
* Handles novel situations
#### Cons
* Expensive
* Slow
* Difficult to scale
* Can become the bottleneck
#### When to Use
Human verification should focus on high-value decisions rather than mechanically checking everything an Agent produces.
This means automation should help humans spend their attention where it matters most.

## Multi-Layer Verification
In practice, the strongest approach combines several verifier types.
A useful model for Agentic SDLC is:

![Multi-layer verification stack](/img/agent-harness-eval-driven-sdlc/12-layered-verification.png)
| Layer | Verification | Examples                        |
| ----- | ------------ | -------------------------------- |
| L0    | Syntax       | compile, lint, typecheck        |
| L1    | Functional   | unit, integration               |
| L2    | Contract     | API, schema, compatibility      |
| L3    | System       | browser, E2E, scenario          |
| L4    | Quality      | security, performance, UX       |
| L5    | Intent       | product, business, human review |

Lower layers tend to be:
* cheaper;
* faster;
* more deterministic;
* easier to automate.
Higher layers tend to be closer to human intent, but are more difficult to automate reliably.
The goal is not to replace human QC completely.
The goal is to **move human attention toward the layers where human judgment provides the most value**.

## Eval Should Measure More Than the Final Output
An Agent can eventually produce a correct solution while following a very poor execution path.
For example:
```text
Read unnecessary secrets
        ↓
Modify unrelated files
        ↓
Disable a test
        ↓
Retry 30 times
        ↓
Consume excessive tokens
        ↓
Eventually pass
```
If the only metric is:
```text
Tests Passed = TRUE
```
the run appears successful.
But it may not be an Agent we want operating autonomously.
Evaluation should therefore consider both:

![Outcome quality and trajectory quality](/img/agent-harness-eval-driven-sdlc/13-eval-dimensions.png)
### Outcome Quality
* correctness;
* user intent;
* regressions;
* product quality.
### Trajectory Quality
* actions taken;
* tools used;
* permissions accessed;
* retries;
* token usage;
* latency;
* cost;
* security behavior.

A production Agent should not only reach the correct answer.
It should reach it through an acceptable process.

## What is an Eval Contract?
One practical problem with autonomous Agents is that we often give them tasks designed for humans.
For example:
> Fix login.
A human engineer can ask questions, infer context, or notice when the requirement does not make sense.
An autonomous Agent needs a more explicit contract.
I call this an **Eval Contract**.
An Eval Contract describes both:
1. what the Agent should achieve;
2. how the result will be evaluated.
It contains six important parts:

![Six parts of an Eval Contract](/img/agent-harness-eval-driven-sdlc/14-eval-contract.png)

### 1. Intent
What outcome are we trying to create?
Instead of:
> Add a refresh-token endpoint.
Prefer:
> Users should not be unexpectedly logged out when an access token expires.
### 2. Acceptance
What must be true before the task is considered complete?
### 3. Constraints
What must the Agent not break?
For example:
* no public API changes;
* no database migration;
* no disabled security middleware;
* no new dependency without approval.
### 4. Evidence
How should the Agent prove completion?
For example:
* unit tests;
* integration tests;
* E2E execution;
* screenshots;
* logs;
* benchmark report.
### 5. Quality Bar
What does *good enough* mean?
For example:
* performance threshold;
* security requirement;
* accessibility level;
* maintainability requirement.
### 6. Escalation
When must the Agent stop and request human input?
For example:
* requirement ambiguity;
* schema migration;
* permission changes;
* production data modification;
* security behavior changes.

## How Does Eval-Driven SDLC Work?
Once a task has an Eval Contract, QC output can become part of the Agent's execution loop.

![Eval-driven SDLC execution loop](/img/agent-harness-eval-driven-sdlc/15-eval-driven-loop.png)

This is where QC becomes part of **orchestration** rather than only a final gate.
A failed evaluation can determine the next action.
For example:
| Failure                | Next action           |
| ----------------------- | ---------------------- |
| Business logic failure | Implementation Agent  |
| Incorrect test         | QC / Test Agent       |
| Requirement ambiguity  | PM / BA               |
| Architecture violation | Developer / Architect |
| High-risk decision     | Human approval        |
This gives Multi-Agent systems a more practical reason to exist.
Instead of creating many Agents simply because human SDLC has many roles:
> **Evaluation signals determine which capability should act next.**

## Autonomy Should Not Be Binary
Another common question is:
> Should we allow Agents to merge code automatically?
A better question is:
> **For which class of tasks, with which verification level, should an Agent be allowed to merge automatically?**
Autonomy is a spectrum.

![Autonomy spectrum from L0 to L5](/img/agent-harness-eval-driven-sdlc/16-autonomy-spectrum.png)

A possible policy:
| Level | Agent responsibility      | Human responsibility |
| ----- | -------------------------- | ---------------------- |
| L0    | Suggest                   | Execute               |
| L1    | Implement                 | Review                |
| L2    | Implement + validate      | Approve               |
| L3    | Auto-fix                  | Policy gate            |
| L4    | Merge low-risk work       | Monitor                |
| L5    | Deliver inside boundaries | Handle exceptions      |
This leads to a useful principle:
```text
Maximum Safe Autonomy
    ≈
Verification Capability
×
Risk Boundary
```
A stronger model alone should not automatically receive more permissions.
More autonomy should require more confidence in our ability to **verify its work**.

## How Human Roles Change
Agentic SDLC does not necessarily remove PM, Developer, QC, or Leader responsibilities.
It changes where those roles spend their effort.
### PM / BA
From:
> Writing task descriptions.
Toward:
> Intent, scenarios, acceptance conditions, and escalation rules.
### Developer
From:
> Primarily implementing every change manually.
Toward:
> Architecture, constraints, tools, environments, and engineering guardrails.
### QC
From:
> Running test cases after development.
Toward:
> Designing verifiers, negative cases, Eval datasets, and failure taxonomies.
### Leader
From:
> Assigning tasks and reviewing output.
Toward:
> Defining risk policies, autonomy levels, metrics, and operating models.

The human moves **up the control loop**.

![Human moves up the control loop](/img/agent-harness-eval-driven-sdlc/17-human-roles.png)

## A Practical Agentic SDLC Workflow
For teams starting to introduce autonomous Agents, I would not begin by asking:
> Which Coding Agent should we buy?
I would start with the workflow.

![Practical agentic SDLC workflow](/img/agent-harness-eval-driven-sdlc/18-practical-workflow.png)
### Step 1: Classify Task Risk
Classify work as:
* low;
* medium;
* high risk.
### Step 2: Create an Eval Contract
Define:
* intent;
* acceptance;
* constraints;
* evidence;
* quality;
* escalation.
### Step 3: Execute in a Controlled Environment
Use:
* isolated workspace;
* scoped permissions;
* controlled tools;
* sandbox;
* time and cost limits.
### Step 4: Verify at Multiple Layers
Use deterministic verification first, then increasingly contextual verification.
### Step 5: Decide the Allowed Autonomy
The result can be:
```text
AUTO CONTINUE
```
or:
```text
HUMAN APPROVAL
```
or:
```text
ESCALATE
```
### Step 6: Learn From Recurring Failures
Recurring Agent failures should eventually become:
* new tests;
* new Eval cases;
* new skills;
* better tools;
* clearer context;
* stronger constraints;
* improved harness rules.

This continuous feedback loop is where **Harness Engineering** becomes important.

## Conclusion
The rapid improvement of frontier models is making AI Agents increasingly capable of executing real software-engineering work.
However, a capable model alone does not create a reliable autonomous engineering system.
The Agent also needs:
* a good environment;
* structured context;
* reliable tools;
* controlled permissions;
* explicit state;
* strong verifiers;
* evaluation;
* feedback loops.
Recent research such as LongHorizon-Harness and Self-Harness shows that changing the harness alone can significantly improve performance without changing the underlying model.
At the same time, research on the Verification Horizon highlights a new challenge:
> As generating complex software becomes easier, reliably verifying it can become harder.
This changes how we should think about Quality Engineering.
QC is no longer only the final step after development.
It becomes part of the Agent's control loop.

For traditional coding assistants, a vague prompt may be enough.
For autonomous SDLC, we need something stronger: **Eval Contracts**, machine-readable evidence, clear risk boundaries, and explicit escalation rules.
The future of software development is therefore not simply:
> AI writing more code.
It is:
> **AI producing work that can be independently verified.**
Or more simply:
> **Generation enables automation. Verification enables autonomy.**

![From model to trustworthy autonomy](/img/agent-harness-eval-driven-sdlc/19-conclusion.png)
