# Writing

Every word GDGOAU publishes goes through two layers:

1. `humanizer.md`: the full humanizer by blader (vendored, MIT). It removes the patterns that make text
   read as AI-written. Run its process on every piece: mark the tells, draft, check facts, finalise.
2. This file: GDGOAU house rules that sit on top of it.

Use the humanizer in "embedded mode": return only the final text inside the material you are making.

## Voice

- Plain, warm and specific. A student organiser writing to a respected partner.
- Short sentences. One idea per sentence. Vary the length.
- Concrete over grand: "800+ students in BOOA halls B and C" beats "a vibrant community of innovators".
- British/Nigerian spelling: programme, honoured, organiser, colour.
- Numbers as digits with the naira sign: ₦1M, ₦500K, ₦3M to ₦4M, 800+.
- Dates: Saturday, 20 February 2027 (long) or Sat, 20 Feb 2027 (pills). Times: 10:00 am to 4:00 pm.
- Ranges use "to", never a dash: "10 to 20 companies".

## The respectful-ask rule (house rule, strict)

We are asking partners for support. Nothing may read as an instruction to them.

| Never | Write instead |
|---|---|
| Confirm by 18 December. | Partners who confirm by 18 December get first choice of booth position. (Or acknowledge their timing.) |
| Your team sets up its booth. | If you would like a booth, we would share the details with the agreement. |
| Your staff open accounts at check-in. | With your support, a desk at check-in could help students open accounts. |
| Your MD opens the day. | If Mrs Example accepts our invitation, her keynote would open the day. |
| You pay a deposit. | We would send a short agreement with payment details. |
| Northwind Bank can cover all of it. | We would be grateful for support with all of it or part of it. |

Senior people get their title and surname ("Mrs Example", "Dr Adeyemi") and the conditional mood until they
accept. Never "your MD", "your boss", "he will".

## Honesty rules

- Targets are targets: "students expected", "companies expected".
- Proposals are proposals: "Proposed keynote", "we would".
- No guaranteed outcomes for the partner ("800+ new customers"). Describe what we will do and measure.
- Students choose freely. If a partner product is involved, say signing up stays the student's choice.
- Every fact has a source the team can point to.

## House bans (on top of the humanizer)

- "Leverage", "synergy", "ecosystem" (abstract), "empower", "unlock", "seamless", "cutting-edge",
  "world-class", "game-changer", "journey" (except a real career path), "excited to", "passionate about".
- Rhetorical questions as titles.
- Exclamation marks in partner materials.
- "Here is what…", "Next:", "Let's look at…" connectors between slides.

## Check before delivering

Run this on the final text (slides: extract all text first):

```bash
grep -nE "—|–| -- |Let's dive|Here's the thing|not just|not only|crucial|leverage|seamless|empower|unlock|vibrant|journey" output.txt
```

Every hit must be fixed or justified (for example a command or URL).
