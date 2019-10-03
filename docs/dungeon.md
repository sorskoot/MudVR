# Dungeon

Although hopefully the rooms in the game don't look like real dungeons, we should approach them as such. That way we can generate an endless dungeon of connected rooms based on specific rules.

## Dungeon Generation Rules

Rules:
- Each room has at least 1 exit
- A room with 1 exit is a dead end
- Change of North, South, East, West exits are equal.
- Change of up or down exit is much lower.

## Possible issues to overcome

- The dungeon MUST be endless. It should not be possible to create a closed loop.

  -1  0   1   2
 --- --- --- ---
|   |   |   |   |  -1
 --- --- --- ---
|   | 0 |   |   |   0
 --- --- --- ---
|   |   |   |   |   1
 --- --- --- ---