# Retrospective

This project tied together topics that had previously been practiced separately:
HTTP APIs, relational modeling, authentication, React state, tests, and containers.
The most useful design choice was filtering every task operation by owner ID. It made
the authorization boundary easy to see and difficult to forget in later routes.

The first version intentionally stays small. Useful follow-up work would include
refresh tokens, accessible modal behavior, optimistic board updates, database-backed
pagination totals, and a migration tool that tracks applied versions.

## Reconstruction disclosure

The original learning repository was accidentally deleted. This version was rebuilt
from the surviving project plan. Its commits use the planned November 2022 through
January 2023 dates to restore the intended historical sequence; they should be read as
a transparent reconstruction, not as independently recovered Git objects.
