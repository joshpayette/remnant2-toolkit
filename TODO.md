# TODO

## Main DB queries

### Mark all Builds as patchAffected

```sql
UPDATE Build SET isPatchAffected = true;
```

### Remove Resonance trait

```sql
DELETE FROM Item WHERE itemId="dmizlm";
DELETE FROM BuildItems WHERE itemId="dmizlm";
```

### Remove Wayfarer trait

```sql
DELETE FROM Item WHERE itemId="b3rey4";
DELETE FROM BuildItems WHERE itemId="b3rey4";
```

### Add Shovel weapon

```sql
INSERT INTO Item SET id="clv87gya10000eqjj0jucs1al", itemId="vpEWS5", dlc="dlc2", isActive=1;
```

### Ensure all [R] replaced with [A]

## Mutators to prioritize updating

- Prophecy (likely description changes)
- Bottom Feeder/Spirit Feeder (total rework)
- Overdrive (probable description changes)
- Transference (probable description changes)
- Opportunist (probable description changes)
