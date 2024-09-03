/**
 * Builds in game get a unique name based on the archetypes used
 * Referenced from https://www.reddit.com/r/remnantgame/comments/158vs4k/all_class_names/
 * by u/Arkavien
 */
export const ARCHETYPE_COMBO_NAMES: Array<{
  archetypes: Array<
    | 'alchemist'
    | 'archon'
    | 'challenger'
    | 'engineer'
    | 'explorer'
    | 'gunslinger'
    | 'handler'
    | 'hunter'
    | 'invader'
    | 'invoker'
    | 'medic'
    | 'ritualist'
    | 'summoner'
  >
  name: string
}> = [
  { archetypes: ['invoker', 'summoner'], name: 'Spirit of Darkness' },
  { archetypes: ['invoker', 'handler'], name: 'Spirit of Friendship' },
  { archetypes: ['invoker', 'medic'], name: 'Spirit of Healing' },
  { archetypes: ['invoker', 'explorer'], name: 'Spirit of Wonder' },
  { archetypes: ['invoker', 'gunslinger'], name: 'Spirit of Frenzy' },
  { archetypes: ['invoker', 'challenger'], name: 'Spirit of Combat' },
  { archetypes: ['invoker', 'hunter'], name: 'Spirit of Stalking' },
  { archetypes: ['invoker', 'invader'], name: 'Spirit of Violence' },
  { archetypes: ['invoker', 'alchemist'], name: 'Spirit of Alchemy' },
  { archetypes: ['invoker', 'archon'], name: 'Spirit of Power' },
  { archetypes: ['invoker', 'ritualist'], name: 'Spirit of Pain' },
  { archetypes: ['invoker', 'engineer'], name: 'Spirit of Creation' },
  { archetypes: ['engineer', 'summoner'], name: 'Mastermind' },
  { archetypes: ['engineer', 'handler'], name: 'Roughneck' },
  { archetypes: ['engineer', 'medic'], name: 'Specialist' },
  { archetypes: ['engineer', 'explorer'], name: 'Pioneer' },
  { archetypes: ['engineer', 'gunslinger'], name: 'Barrelsmith' },
  { archetypes: ['engineer', 'challenger'], name: 'Sentinel' },
  { archetypes: ['engineer', 'hunter'], name: 'Tactician' },
  { archetypes: ['engineer', 'invader'], name: 'Operator' },
  { archetypes: ['engineer', 'alchemist'], name: 'Artificer' },
  { archetypes: ['summoner', 'handler'], name: 'Beastmaster' },
  { archetypes: ['summoner', 'medic'], name: 'Defiler' },
  { archetypes: ['summoner', 'explorer'], name: 'Herald' },
  { archetypes: ['summoner', 'gunslinger'], name: 'Tormentor' },
  { archetypes: ['summoner', 'challenger'], name: 'Overseer' },
  { archetypes: ['summoner', 'hunter'], name: 'Tyrant' },
  { archetypes: ['summoner', 'alchemist'], name: 'Conjurer' },
  { archetypes: ['handler', 'medic'], name: 'Shepherd' },
  { archetypes: ['handler', 'explorer'], name: 'Bloodhound' },
  { archetypes: ['handler', 'gunslinger'], name: 'Ridgeback' },
  { archetypes: ['handler', 'challenger'], name: 'Bulldog' },
  { archetypes: ['handler', 'hunter'], name: 'Predator' },
  { archetypes: ['handler', 'invader'], name: 'Prowler' },
  { archetypes: ['handler', 'alchemist'], name: 'Grey Wolf' },
  { archetypes: ['medic', 'explorer'], name: 'Survivalist' },
  { archetypes: ['medic', 'gunslinger'], name: 'Peacemaker' },
  { archetypes: ['medic', 'challenger'], name: 'Guardian' },
  { archetypes: ['medic', 'hunter'], name: 'Ranger' },
  { archetypes: ['medic', 'invader'], name: 'Bloodletter' },
  { archetypes: ['medic', 'alchemist'], name: 'Shaman' },
  { archetypes: ['explorer', 'gunslinger'], name: 'Raider' },
  { archetypes: ['explorer', 'challenger'], name: 'Crusader' },
  { archetypes: ['explorer', 'hunter'], name: 'Outrider' },
  { archetypes: ['explorer', 'invader'], name: 'Marauder' },
  { archetypes: ['explorer', 'alchemist'], name: 'Apothecary' },
  { archetypes: ['gunslinger', 'hunter'], name: 'Sharpshooter' },
  { archetypes: ['gunslinger', 'challenger'], name: 'Mercenary' },
  { archetypes: ['gunslinger', 'invader'], name: 'Professional' },
  { archetypes: ['gunslinger', 'alchemist'], name: 'Leadbringer' },
  { archetypes: ['challenger', 'hunter'], name: 'Soldier' },
  { archetypes: ['challenger', 'invader'], name: 'Destroyer' },
  { archetypes: ['challenger', 'alchemist'], name: 'Conservator' },
  { archetypes: ['hunter', 'invader'], name: 'Assassin' },
  { archetypes: ['hunter', 'alchemist'], name: 'Isolator' },
  { archetypes: ['invader', 'alchemist'], name: 'Trickster' },
  { archetypes: ['archon', 'medic'], name: 'Virtuoso' },
  { archetypes: ['archon', 'summoner'], name: 'Invoker' },
  { archetypes: ['archon', 'handler'], name: 'Harrier' },
  { archetypes: ['archon', 'engineer'], name: 'Luminary' },
  { archetypes: ['archon', 'explorer'], name: 'Trailblazer' },
  { archetypes: ['archon', 'gunslinger'], name: 'Firebrand' },
  { archetypes: ['archon', 'hunter'], name: 'Vanquisher' },
  { archetypes: ['archon', 'challenger'], name: 'Arbiter' },
  { archetypes: ['archon', 'invader'], name: 'Ruiner' },
  { archetypes: ['archon', 'alchemist'], name: 'Thaumaturge' },
  { archetypes: ['ritualist', 'summoner'], name: 'Gravelord' },
  { archetypes: ['ritualist', 'medic'], name: 'Plague Doctor' },
  { archetypes: ['ritualist', 'handler'], name: 'Hellhound' },
  { archetypes: ['ritualist', 'engineer'], name: 'Wrecker' },
  { archetypes: ['ritualist', 'explorer'], name: 'Outcast' },
  { archetypes: ['ritualist', 'gunslinger'], name: 'Punisher' },
  { archetypes: ['ritualist', 'challenger'], name: 'Warlord' },
  { archetypes: ['ritualist', 'hunter'], name: 'Headhunter' },
  { archetypes: ['ritualist', 'invader'], name: 'Reaper' },
  { archetypes: ['ritualist', 'alchemist'], name: 'Diabolist' },
  { archetypes: ['ritualist', 'archon'], name: 'Harbinger' },
]
