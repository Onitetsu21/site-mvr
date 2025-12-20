-- =============================================
-- MULTIVERSAL RECORDS - SEED DATA
-- Données réelles du label
-- =============================================

-- =============================================
-- ARTISTS
-- =============================================

INSERT INTO artists (name, slug, styles, location, bio_fr, link_soundcloud, link_bandcamp, link_instagram, link_spotify, link_beatport, is_featured, display_order) VALUES

-- Artistes principaux du roster
('The Trancemancer', 'the-trancemancer', ARRAY['Full-On', 'Psytrance'], 'Lyon, France', 
'The Trancemancer est un producteur et DJ lyonnais, pilier de la scène psytrance française. Signé chez BMSS Records et Multiversal Records, il délivre un Full-On énergique et mélodique qui fait vibrer les dancefloors. Son live set est une expérience immersive qui mêle puissance et émotion.',
'https://soundcloud.com/thetrancemancer', 'https://multiversalrecords.bandcamp.com', 'https://instagram.com/thetrancemancer', NULL, 'https://www.beatport.com/artist/the-trancemancer/706155', true, 1),

('Psy Fact', 'psy-fact', ARRAY['Psytrance', 'Full-On', 'Night Full-On'], 'Lyon, France',
'Psy Fact explore les territoires variés de la psytrance, du Full-On lumineux aux sonorités plus nocturnes. Producteur prolifique chez MVR, il signe des tracks reconnaissables par leur groove imparable et leurs mélodies accrocheuses.',
'https://soundcloud.com/psyfact-music', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/psy-fact/914540', true, 2),

('GoHu', 'gohu', ARRAY['Psytrance', 'Progressive'], 'France',
'GoHu propose une psytrance progressive et atmosphérique. Son EP "Buried Memories" sorti en 2024 témoigne de sa capacité à créer des ambiances profondes et des voyages sonores captivants.',
'https://soundcloud.com/gohu-music', 'https://multiversalrecords.bandcamp.com/album/buried-memories', NULL, NULL, NULL, true, 3),

('I:ON', 'i-on', ARRAY['Psytrance', 'Progressive', 'Full-On'], 'France',
'I:ON (anciennement I.ON) développe une psytrance moderne aux influences progressives. Collaborateur régulier de Primabot, il signe des productions soignées qui ont marqué le catalogue MVR.',
'https://soundcloud.com/music-ion', 'https://multiversalrecords.bandcamp.com', NULL, NULL, NULL, true, 4),

('Ulmo', 'ulmo', ARRAY['Darkpsy', 'Forest', 'Psytrance'], 'France',
'Ulmo explore les sonorités plus sombres de l''univers psychédélique. Entre darkpsy et forest, ses productions créent des atmosphères mystérieuses et envoûtantes.',
'https://soundcloud.com/ulmo-music', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/ulmo/670800', false, 5),

('Anija', 'anija', ARRAY['Darkpsy', 'Forest'], 'France',
'Anija s''aventure dans les territoires obscurs de la psytrance avec son EP "Groove in the Graves". Une approche sombre mais groovy qui séduit les amateurs de sons forestiers.',
'https://soundcloud.com/anija-music', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/anija/851599', false, 6),

('Tripshift', 'tripshift', ARRAY['Psytrance', 'Full-On'], 'France',
'Tripshift livre une psytrance énergique et psychédélique. Son single "Rebirth" incarne parfaitement sa vision d''une musique qui pousse à la renaissance sur le dancefloor.',
'https://soundcloud.com/tripshift', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/tripshift/744911', false, 7),

('Astro Nordik', 'astro-nordik', ARRAY['Psytrance', 'Progressive'], 'France',
'Astro Nordik propose une psytrance cosmique et contemplative. Son album "Entropie" est un voyage à travers les étoiles, mêlant mélodies éthérées et basses profondes.',
'https://soundcloud.com/astro-nordik', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/astro-nordik/782136', false, 8),

('Qhemist', 'qhemist', ARRAY['Full-On', 'Psytrance'], 'France',
'Qhemist est un alchimiste sonore qui fusionne les éléments de la psytrance avec précision. Ses collaborations avec The Trancemancer ont donné naissance à des tracks mémorables comme "Talisman" et "Exoconsciousness".',
'https://soundcloud.com/qhemist', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/qhemist/483095', false, 9),

('Psyzenberg', 'psyzenberg', ARRAY['Psytrance', 'Full-On'], 'France',
'Psyzenberg apporte sa touche personnelle à la psytrance française. Entre D-Xperience et Distorted Mirror, il explore les facettes multiples du genre avec créativité.',
'https://soundcloud.com/psyzenberg', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/psyzenberg/804202', false, 10),

('LowFilter', 'lowfilter', ARRAY['Psytrance', 'Alternative'], 'France',
'LowFilter développe une approche alternative de la psytrance. Son EP "J''existe" est une déclaration artistique qui mêle introspection et énergie.',
'https://soundcloud.com/lowfilter', 'https://multiversalrecords.bandcamp.com/album/jexiste-ep', NULL, NULL, 'https://www.beatport.com/artist/lowfilter/175415', false, 11),

('Synæst', 'synaest', ARRAY['Psytrance', 'Progressive'], 'France',
'Synæst crée une psytrance immersive et sensorielle. Son "Ritual Call" est une invitation au voyage intérieur.',
'https://soundcloud.com/synaest', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/synst/927995', false, 12),

('Nidra', 'nidra', ARRAY['Psytrance', 'Progressive'], 'France',
'Nidra explore les états de conscience à travers sa musique. "Split Theory" illustre sa capacité à créer des tracks hypnotiques et entraînantes.',
'https://soundcloud.com/nidra-music', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/nidra/1141813', false, 13),

('Unlucide', 'unlucide', ARRAY['Psytrance', 'Full-On'], 'France',
'Unlucide est une des révélations récentes du label. "Welcome In Wonderland" marque son entrée remarquée dans l''univers MVR.',
'https://soundcloud.com/unlucide', 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/unlucide/1279340', false, 14),

('Dheeva', 'dheeva', ARRAY['Psytrance', 'Full-On'], 'France',
'Dheeva livre une psytrance combative et énergique. Son EP "The Battle" est un appel à se dépasser sur le dancefloor.',
NULL, 'https://multiversalrecords.bandcamp.com', NULL, NULL, 'https://www.beatport.com/artist/dheeva/856331', false, 15);


-- =============================================
-- RELEASES
-- =============================================

INSERT INTO releases (title, slug, release_type, release_date, catalog_number, description_fr, link_bandcamp, link_beatport, tracklist) VALUES

('Welcome In Wonderland', 'welcome-in-wonderland', 'single', '2025-03-01', 'MVR047',
'Dernier single en date du label, Unlucide nous emmène dans son wonderland psychédélique.',
'https://multiversalrecords.bandcamp.com/track/welcome-in-wonderland',
'https://www.beatport.com/release/welcome-in-wonderland/4940502',
'[{"title": "Welcome In Wonderland", "duration": 458}]'),

('Beyond The Threshold', 'beyond-the-threshold', 'va', '2025-01-15', 'MVR046',
'Compilation réunissant 11 artistes du label et de la scène française. Un voyage à travers les différentes facettes de la psytrance.',
'https://multiversalrecords.bandcamp.com/album/beyond-the-threshold',
'https://www.beatport.com/release/beyond-the-threshold/4871030',
'[{"title": "The Trancemancer - The Sounds", "duration": 445}, {"title": "VARANOÏD - Bird Contact", "duration": 432}, {"title": "Dezzert - Butterfly''s Revenge", "duration": 467}, {"title": "Hypnospores & Wooden Ships - Happy Flight", "duration": 489}, {"title": "PSAR - Boom Boom Malabar", "duration": 456}, {"title": "Psy Fact - Tsah Ud", "duration": 478}, {"title": "Unlucide - Beyond", "duration": 445}, {"title": "Atypical - Funky Brewster", "duration": 423}, {"title": "Zeo - Jungian Method", "duration": 498}]'),

('Split Theory', 'split-theory', 'single', '2024-12-01', 'MVR045',
'Nidra explore la dualité de l''esprit dans ce single hypnotique.',
'https://multiversalrecords.bandcamp.com/track/split-theory',
'https://www.beatport.com/release/split-theory/5079373',
'[{"title": "Split Theory", "duration": 465}]'),

('Buried Memories', 'buried-memories', 'ep', '2024-06-19', 'MVR044',
'GoHu nous livre un EP introspectif aux ambiances profondes et mélancoliques.',
'https://multiversalrecords.bandcamp.com/album/buried-memories',
NULL,
'[{"title": "Buried Memories", "duration": 489}, {"title": "Lost Fragment", "duration": 456}]'),

('I:ON - Echoes', 'ion-echoes', 'single', '2024-04-15', 'MVR043',
'I:ON revient avec un single puissant aux résonances cosmiques.',
'https://multiversalrecords.bandcamp.com/track/i-on-echoes',
NULL,
'[{"title": "Echoes", "duration": 472}]'),

('Nomad Galaxy', 'nomad-galaxy', 'single', '2024-02-01', 'MVR042',
'Collaboration entre I.ON et Primabot, ce single nous transporte aux confins de la galaxie.',
'https://multiversalrecords.bandcamp.com/track/nomad-galaxy',
NULL,
'[{"title": "Nomad Galaxy", "duration": 485}]'),

('Funkadelic Gates', 'funkadelic-gates', 'single', '2023-11-15', 'MVR041',
'Psy Fact ouvre les portes d''une dimension funk et psychédélique.',
'https://multiversalrecords.bandcamp.com/track/funkadelic-gates',
NULL,
'[{"title": "Funkadelic Gates", "duration": 467}]'),

('Black Hole Expedition', 'black-hole-expedition', 'va', '2023-09-01', 'MVR040',
'Compilation aventureuse réunissant les explorateurs sonores du label.',
'https://multiversalrecords.bandcamp.com/album/black-hole-expedition',
NULL,
'[{"title": "Track 1", "duration": 445}, {"title": "Track 2", "duration": 467}, {"title": "Track 3", "duration": 489}, {"title": "Track 4", "duration": 456}, {"title": "Track 5", "duration": 478}]'),

('Astral Travel', 'astral-travel', 'single', '2023-06-15', 'MVR039',
'The Trancemancer nous offre un voyage astral en téléchargement gratuit.',
'https://multiversalrecords.bandcamp.com/track/astral-travel-free-download',
NULL,
'[{"title": "Astral Travel", "duration": 492}]'),

('Artificial Mysticism', 'artificial-mysticism', 'ep', '2023-04-01', 'MVR038',
'Zalien explore le mysticisme artificiel dans cet EP aux textures futuristes.',
'https://multiversalrecords.bandcamp.com/album/artificial-mysticism',
NULL,
'[{"title": "Artificial Mysticism", "duration": 478}, {"title": "Digital Shaman", "duration": 465}]'),

('River Of Lights', 'river-of-lights', 'single', '2022-09-15', 'MVR035',
'Psy Fact illumine le dancefloor avec cette rivière de lumières sonores.',
'https://multiversalrecords.bandcamp.com/track/river-of-lights-2',
'https://www.beatport.com/release/river-of-lights/3781208',
'[{"title": "River Of Lights", "duration": 456}]'),

('J''existe EP', 'jexiste-ep', 'ep', '2022-08-01', 'MVR034',
'LowFilter affirme son existence artistique avec cet EP personnel et engagé.',
'https://multiversalrecords.bandcamp.com/album/jexiste-ep',
'https://www.beatport.com/release/jexiste/3738880',
'[{"title": "J''existe", "duration": 489}, {"title": "Résonance", "duration": 467}, {"title": "Éveil", "duration": 445}]'),

('Lueurs Brumeuses', 'lueurs-brumeuses', 'single', '2022-03-15', 'MVR032',
'Ulmo nous plonge dans une atmosphère brumeuse et mystérieuse.',
'https://multiversalrecords.bandcamp.com/track/lueurs-brumeuses',
'https://www.beatport.com/release/lueurs-brumeuses/3373262',
'[{"title": "Lueurs Brumeuses", "duration": 478}]'),

('Ritual Call', 'ritual-call', 'single', '2021-10-01', 'MVR030',
'Synæst lance l''appel rituel pour une communion sur le dancefloor.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/ritual-call/3158472',
'[{"title": "Ritual Call", "duration": 465}]'),

('MVR & Friends V.A', 'mvr-and-friends-va', 'va', '2021-01-15', 'MVR025',
'13 tracks par des producteurs français talentueux. Du Chillgressive à la Psytrance en passant par la Dark et la Forest.',
'https://multiversalrecords.bandcamp.com/album/mvr-friends-v-a-24bits',
NULL,
'[{"title": "InnSæi - Nautica (Primabot remix)", "duration": 445}, {"title": "I.ON - Hyponeros", "duration": 467}, {"title": "Ollie - Galactic Rumble", "duration": 434}, {"title": "Xale - Another Dystopia", "duration": 489}, {"title": "Oumuamua - Interstellar", "duration": 456}, {"title": "Psy Fact - Jungle Walk", "duration": 478}, {"title": "Psykohm - Psynapse", "duration": 445}, {"title": "Tripshift - Self Reflection", "duration": 467}, {"title": "Microkod - Metamorph", "duration": 489}, {"title": "GoHu''s Experiment - Healing Process", "duration": 423}, {"title": "Anija - Blackbird", "duration": 456}, {"title": "Ulmo - Cursed Lands", "duration": 478}, {"title": "The Macedonian - Moonlight Clearing", "duration": 498}]'),

('Darkside', 'darkside', 'single', '2020-09-14', 'MVR022',
'Psy Fact explore le côté obscur de la force.',
'https://multiversalrecords.bandcamp.com/track/darkside',
'https://www.beatport.com/release/darkside/3106006',
'[{"title": "Darkside", "duration": 467}]'),

('Exoconsciousness', 'exoconsciousness', 'single', '2020-07-01', 'MVR021',
'Collaboration entre Qhemist et The Trancemancer pour un voyage vers la conscience élargie.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/exoconsciousness/3043248',
'[{"title": "Exoconsciousness", "duration": 489}]'),

('Rebirth', 'rebirth', 'single', '2020-06-01', 'MVR020',
'Tripshift célèbre la renaissance sur le dancefloor.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/rebirth/3011936',
'[{"title": "Rebirth", "duration": 456}]'),

('Talisman', 'talisman', 'single', '2020-04-15', 'MVR019',
'Qhemist et The Trancemancer créent un talisman sonore protecteur.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/talisman/2953461',
'[{"title": "Talisman", "duration": 478}]'),

('The Battle', 'the-battle', 'ep', '2020-03-01', 'MVR018',
'Dheeva livre un EP combatif pour guerriers du dancefloor.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/the-battle/2908385',
'[{"title": "The Battle", "duration": 467}, {"title": "Warrior Spirit", "duration": 445}, {"title": "Victory Dance", "duration": 489}]'),

('Groove in the Graves', 'groove-in-the-graves', 'ep', '2020-02-01', 'MVR017',
'Anija groove dans les tombes avec cet EP dark et dansant.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/groove-in-the-graves/2888621',
'[{"title": "Groove in the Graves", "duration": 478}, {"title": "Midnight Dance", "duration": 456}, {"title": "Shadows", "duration": 489}]'),

('Multiversal Records Compilation 2019', 'mvr-compilation-2019', 'va', '2019-12-01', 'MVR015',
'La première grande compilation du label réunissant 16 artistes de la scène française.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/multiversal-records-compilation-2019/2816191',
'[{"title": "NP Snow - Track", "duration": 445}, {"title": "E-Klozion - Track", "duration": 467}, {"title": "Biggy Paw - Track", "duration": 489}, {"title": "Ion - Track", "duration": 456}, {"title": "Yama Hel - Track", "duration": 478}, {"title": "Psytronaute - Track", "duration": 445}, {"title": "Krash - Track", "duration": 467}, {"title": "Astro Nordik - Track", "duration": 489}, {"title": "KosmiKoala - Track", "duration": 423}, {"title": "Farfacid - Track", "duration": 456}, {"title": "Psyzenberg - Track", "duration": 478}, {"title": "The Trancemancer - Track", "duration": 445}, {"title": "Xale - Track", "duration": 467}, {"title": "Alienason - Track", "duration": 489}, {"title": "Oyaji - Track", "duration": 456}, {"title": "Psykohm - Track", "duration": 478}]'),

('Entropie', 'entropie', 'album', '2019-09-01', 'MVR012',
'Premier album d''Astro Nordik, un voyage cosmique à travers 8 tracks.',
'https://multiversalrecords.bandcamp.com',
'https://www.beatport.com/release/entropie/2625478',
'[{"title": "Entropie I", "duration": 445}, {"title": "Cosmic Drift", "duration": 467}, {"title": "Stellar Winds", "duration": 489}, {"title": "Nebula", "duration": 456}, {"title": "Black Star", "duration": 478}, {"title": "Supernova", "duration": 445}, {"title": "Entropy II", "duration": 467}, {"title": "Beyond", "duration": 512}]');


-- =============================================
-- RELEASE_ARTISTS (relations)
-- =============================================

-- On doit d'abord récupérer les IDs
-- Cette partie sera à adapter avec les vrais UUIDs générés

-- Pour Welcome In Wonderland -> Unlucide
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'welcome-in-wonderland' AND a.slug = 'unlucide';

-- Pour Split Theory -> Nidra
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'split-theory' AND a.slug = 'nidra';

-- Pour Buried Memories -> GoHu
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'buried-memories' AND a.slug = 'gohu';

-- Pour I:ON Echoes -> I:ON
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'ion-echoes' AND a.slug = 'i-on';

-- Pour Nomad Galaxy -> I:ON
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'nomad-galaxy' AND a.slug = 'i-on';

-- Pour Funkadelic Gates -> Psy Fact
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'funkadelic-gates' AND a.slug = 'psy-fact';

-- Pour Astral Travel -> The Trancemancer
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'astral-travel' AND a.slug = 'the-trancemancer';

-- Pour River Of Lights -> Psy Fact
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'river-of-lights' AND a.slug = 'psy-fact';

-- Pour J'existe EP -> LowFilter
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'jexiste-ep' AND a.slug = 'lowfilter';

-- Pour Lueurs Brumeuses -> Ulmo
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'lueurs-brumeuses' AND a.slug = 'ulmo';

-- Pour Ritual Call -> Synæst
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'ritual-call' AND a.slug = 'synaest';

-- Pour Darkside -> Psy Fact
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'darkside' AND a.slug = 'psy-fact';

-- Pour Exoconsciousness -> Qhemist & The Trancemancer
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'exoconsciousness' AND a.slug = 'qhemist';

INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'exoconsciousness' AND a.slug = 'the-trancemancer';

-- Pour Rebirth -> Tripshift
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'rebirth' AND a.slug = 'tripshift';

-- Pour Talisman -> Qhemist & The Trancemancer
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'talisman' AND a.slug = 'qhemist';

INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'talisman' AND a.slug = 'the-trancemancer';

-- Pour The Battle -> Dheeva
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'the-battle' AND a.slug = 'dheeva';

-- Pour Groove in the Graves -> Anija
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'groove-in-the-graves' AND a.slug = 'anija';

-- Pour Entropie -> Astro Nordik
INSERT INTO release_artists (release_id, artist_id)
SELECT r.id, a.id FROM releases r, artists a 
WHERE r.slug = 'entropie' AND a.slug = 'astro-nordik';


-- =============================================
-- EVENTS
-- =============================================

INSERT INTO events (name, slug, event_date, venue_name, venue_address, description_fr, link_tickets, link_facebook) VALUES

('Multiversal Night #16', 'multiversal-night-16', '2025-03-15 22:00:00+01', 'La Rayonne', '26 Rue Gervais Bussière, 69100 Villeurbanne',
'La 16ème édition de notre soirée mensuelle ! Line-up 100% MVR avec les artistes du label.',
'https://shotgun.live/events/multiversal-night-16', 'https://facebook.com/events/multiversal-night-16'),

('Multiversal Night #15', 'multiversal-night-15', '2025-02-15 22:00:00+01', 'La Rayonne', '26 Rue Gervais Bussière, 69100 Villeurbanne',
'15ème édition de notre rendez-vous mensuel à La Rayonne.',
'https://shotgun.live/events/multiversal-night-15', 'https://facebook.com/events/multiversal-night-15'),

('SYMBIOSIS : Boom Shankar + Yabba Dabba + Insane Creatures', 'symbiosis-2024', '2024-03-29 23:00:00+01', 'La Rayonne', '26 Rue Gervais Bussière, 69100 Villeurbanne',
'Pour marquer le coup, nous invitons trois têtes d''affiche internationales ! Boom Shankar (BMSS Records), Yabba Dabba et Insane Creatures, accompagnés par Soul Edge et The Trancemancer. Scénographie par Hadra The Mad Studio.',
NULL, 'https://facebook.com/events/symbiosis-2024'),

('Multiversal Night #10', 'multiversal-night-10', '2023-09-23 22:00:00+02', 'La Rayonne', '26 Rue Gervais Bussière, 69100 Villeurbanne',
'10ème édition ! Un cap symbolique pour notre soirée mensuelle.',
NULL, NULL),

('MVR x Outrance : Tech to Psy', 'tech-to-psy-outrance', '2023-06-17 23:00:00+02', 'Péniche Loupika', 'Quai Rambaud, 69002 Lyon',
'Collaboration spéciale avec le collectif Outrance pour une soirée mélangeant techno et psytrance sur la péniche Loupika.',
NULL, NULL),

('Forest Gathering 2023', 'forest-gathering-2023', '2023-07-15 14:00:00+02', 'Secret Location', 'Monts du Lyonnais',
'Notre événement outdoor annuel ! Une journée complète dans la nature avec un line-up forest et darkpsy.',
NULL, NULL),

('Multiversal Night #5', 'multiversal-night-5', '2022-04-16 22:00:00+02', 'Le Sonic', '15 Rue du Garet, 69001 Lyon',
'5ème édition de notre soirée au Sonic Lyon.',
NULL, NULL),

('MVR Birthday Party - 3 ans', 'mvr-birthday-3-ans', '2022-11-19 22:00:00+01', 'La Rayonne', '26 Rue Gervais Bussière, 69100 Villeurbanne',
'Célébration des 3 ans du label avec tous les artistes du roster !',
NULL, NULL);


-- =============================================
-- EVENT LINEUP
-- =============================================

-- Multiversal Night #16
INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 1 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-16' AND a.slug = 'the-trancemancer';

INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 2 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-16' AND a.slug = 'psy-fact';

INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 3 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-16' AND a.slug = 'gohu';

-- Multiversal Night #15
INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 1 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-15' AND a.slug = 'i-on';

INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 2 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-15' AND a.slug = 'ulmo';

INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 3 FROM events e, artists a 
WHERE e.slug = 'multiversal-night-15' AND a.slug = 'anija';

-- SYMBIOSIS 2024 - avec artistes externes
INSERT INTO event_lineup (event_id, external_name, external_link, display_order)
SELECT e.id, 'Boom Shankar', 'https://soundcloud.com/boomshankar', 1 FROM events e 
WHERE e.slug = 'symbiosis-2024';

INSERT INTO event_lineup (event_id, external_name, external_link, display_order)
SELECT e.id, 'Yabba Dabba', 'https://soundcloud.com/yabbadabba', 2 FROM events e 
WHERE e.slug = 'symbiosis-2024';

INSERT INTO event_lineup (event_id, external_name, external_link, display_order)
SELECT e.id, 'Insane Creatures', 'https://soundcloud.com/insanecreatures', 3 FROM events e 
WHERE e.slug = 'symbiosis-2024';

INSERT INTO event_lineup (event_id, artist_id, display_order)
SELECT e.id, a.id, 4 FROM events e, artists a 
WHERE e.slug = 'symbiosis-2024' AND a.slug = 'the-trancemancer';

INSERT INTO event_lineup (event_id, external_name, external_link, display_order)
SELECT e.id, 'Soul Edge', 'https://soundcloud.com/souledge', 5 FROM events e 
WHERE e.slug = 'symbiosis-2024';


-- =============================================
-- TEAM MEMBERS
-- =============================================

INSERT INTO team_members (first_name, roles, poles, display_order) VALUES
('Président', ARRAY['president'], ARRAY['admin'], 1),
('Trésorier', ARRAY['tresorier'], ARRAY['admin'], 2),
('Secrétaire', ARRAY['secretaire'], ARRAY['admin', 'release'], 3),
('Resp. Event', ARRAY['responsable_pole'], ARRAY['event'], 4),
('Resp. Graphisme', ARRAY['responsable_pole'], ARRAY['graphisme'], 5),
('Resp. Scéno', ARRAY['responsable_pole'], ARRAY['sceno'], 6);
