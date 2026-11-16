import type { GeneratedImageName } from './media';
import type { Localized } from './types';

export type MediaMeta = {
  alt: Localized;
  /** CSS object-position used when the image is cropped (`fit="cover"`). Screenshots have none. */
  focal?: string;
};

/** Hand-written alt text and focal points; every published image needs an entry. */
export const mediaMeta = {
  // Products
  'ugckit-landing': {
    alt: {
      en: 'UGCKit landing page: Make scroll-stopping UGC videos from one project brief, with a product preview',
      fr: 'Page d’accueil d’UGCKit : des vidéos UGC qui arrêtent le scroll à partir d’un seul brief, avec un aperçu du produit',
    },
  },
  'ugckit-landing-light': {
    alt: {
      en: 'UGCKit landing page in light mode, with a product preview',
      fr: 'Page d’accueil d’UGCKit en thème clair, avec un aperçu du produit',
    },
  },
  'chtprk-landing': { alt: { en: 'chtprk.com landing page', fr: 'Page d’accueil de chtprk.com' } },
  'chtprk-landing-light': {
    alt: { en: 'chtprk.com landing page in light mode', fr: 'Page d’accueil de chtprk.com en thème clair' },
  },
  'fourma-store-home': {
    alt: {
      en: 'Fourma App Store screen “Your training, planned”: the home screen with this week’s plan and today’s Upper power workout',
      fr: 'Écran App Store de Fourma « Your training, planned » : l’accueil avec le programme de la semaine et la séance Upper power du jour',
    },
  },
  'fourma-store-live': {
    alt: {
      en: 'Fourma App Store screen “Every rep, guided”: a live barbell bench press set with weight and reps steppers',
      fr: 'Écran App Store de Fourma « Every rep, guided » : une série de développé couché en direct avec réglage du poids et des répétitions',
    },
  },
  'fourma-store-progress': {
    alt: {
      en: 'Fourma App Store screen “See yourself get stronger”: progress stats, weekly consistency chart and personal records',
      fr: 'Écran App Store de Fourma « See yourself get stronger » : statistiques de progression, régularité par semaine et records personnels',
    },
  },
  'egov-desktop': {
    alt: {
      en: 'eGouvernement on a desktop browser, an Android phone and an iPhone: the assistant home page with suggested questions, the services list and the chat',
      fr: 'eGouvernement sur un navigateur de bureau, un téléphone Android et un iPhone : l’accueil de l’assistant avec des questions suggérées, la liste des services et le chat',
    },
  },

  // L'Effiloché
  'kitchen-board': {
    alt: {
      en: 'Kitchen board with to-do, in-preparation and ready columns and allergy flags',
      fr: 'Tableau de la cuisine avec les colonnes à faire, en préparation et prêt, et les alertes allergènes',
    },
  },
  'kitchen-new-order-alert': {
    alt: { en: 'New-order alert on the kitchen screen', fr: 'Alerte de nouvelle commande sur l’écran de la cuisine' },
  },
  'customer-web-menu': { alt: { en: 'Customer web menu', fr: 'Menu web client' } },
  'customer-mobile-menu': { alt: { en: 'Customer mobile menu', fr: 'Menu mobile client' } },
  'customer-tracking': { alt: { en: 'Customer order tracking', fr: 'Suivi de commande client' } },
  'driver-tour-summary': { alt: { en: 'Driver tour summary', fr: 'Récapitulatif de tournée livreur' } },
  'counter-handoff': {
    alt: {
      en: 'Counter hand-off screen: the customer’s pickup code is checked before the order is handed over',
      fr: 'Écran de remise au comptoir : le code de retrait du client est vérifié avant de remettre la commande',
    },
  },

  // Lab screenshots
  grafana: {
    alt: {
      en: 'Grafana homelab overview dashboard with 9 targets, Proxmox, LXC status and TrueNAS panels',
      fr: 'Tableau de bord Grafana du homelab avec 9 cibles, Proxmox, l’état des LXC et des panneaux TrueNAS',
    },
  },
  ha: {
    alt: { en: 'Home Assistant tablet-style overview dashboard', fr: 'Tableau de bord Home Assistant façon tablette' },
  },
  proxmox: {
    alt: {
      en: 'Proxmox VE datacenter view listing 14 LXC containers',
      fr: 'Vue datacenter de Proxmox VE listant 14 conteneurs LXC',
    },
  },
  traefik: {
    alt: {
      en: 'Traefik dashboard showing routers, services and middlewares all healthy',
      fr: 'Tableau de bord Traefik avec routeurs, services et middlewares tous en bonne santé',
    },
  },
  pihole: {
    alt: {
      en: 'Pi-hole dashboard with daily queries, block rate and list size',
      fr: 'Tableau de bord Pi-hole avec les requêtes du jour, le taux de blocage et la taille des listes',
    },
  },
  portainer: {
    alt: {
      en: 'Portainer listing Docker environments across the containers',
      fr: 'Portainer listant les environnements Docker répartis dans les conteneurs',
    },
  },
  nextcloud: { alt: { en: 'Nextcloud dashboard', fr: 'Tableau de bord Nextcloud' } },
  'music-assistant': {
    alt: {
      en: 'Music Assistant now-playing view with playback controls and the Snapcast output selected',
      fr: 'Vue « en cours de lecture » de Music Assistant avec les commandes de lecture et la sortie Snapcast sélectionnée',
    },
  },
  'jellyfin-libraries': {
    alt: {
      en: 'Jellyfin libraries row with custom Live TV, Movies, Music and TV Shows tiles designed to match the TV launcher',
      fr: 'Rangée de bibliothèques Jellyfin avec des tuiles Live TV, Films, Musique et Séries dessinées pour s’accorder au launcher TV',
    },
  },
  'tv-launcher': {
    alt: {
      en: 'Custom TV launcher home screen with clock, animated starry ribbon, an Ambilight Live chip and a row of apps including Jellyfin, Twitch and the PC HDMI input',
      fr: 'Écran d’accueil du launcher TV maison : horloge, ruban étoilé animé, pastille Ambilight Live et une rangée d’applis dont Jellyfin, Twitch et l’entrée HDMI du PC',
    },
  },

  // Standing desk
  'desk-esp32-installed': {
    alt: {
      en: 'The finished desk controller: a small black box plugged into the Maidesite control box’s RJ12 handset port, next to the motor cables',
      fr: 'Le contrôleur de bureau terminé : un petit boîtier noir branché sur le port RJ12 de la télécommande du boîtier de commande Maidesite, à côté des câbles moteur',
    },
    focal: '50% 30%',
  },
  'desk-esp32-sealed': {
    alt: {
      en: 'ESP32-S3-Zero sealed with hot glue on its RJ12 cable',
      fr: 'ESP32-S3-Zero noyé dans la colle chaude sur son câble RJ12',
    },
    focal: '50% 25%',
  },
  'desk-esp32-board': {
    alt: {
      en: 'ESP32-S3-Zero with coloured wires soldered to a cut RJ12 cable',
      fr: 'ESP32-S3-Zero avec des fils de couleur soudés à un câble RJ12 coupé',
    },
    focal: '50% 20%',
  },
  'desk-esp32-rj45': {
    alt: {
      en: 'Back side of the board showing the flat RJ12 cable and connector',
      fr: 'Le dos de la carte, avec le câble RJ12 plat et son connecteur',
    },
  },
  'desk-esp32-mounted-glue': {
    alt: {
      en: 'The sealed board plugged in beside the desk’s motor cables',
      fr: 'La carte scellée branchée à côté des câbles moteur du bureau',
    },
  },
  'desk-ha-controls': {
    alt: {
      en: 'Home Assistant device page with desk up and down, height slider and M1 to M4 presets',
      fr: 'Page de l’appareil dans Home Assistant avec monter et descendre, curseur de hauteur et positions M1 à M4',
    },
  },
  'esp32-s3-zero': {
    alt: { en: 'A bare ESP32-S3-Zero board', fr: 'Une carte ESP32-S3-Zero nue' },
  },

  // Smart USB KVM
  'kvm-pcb-mod': {
    alt: {
      en: 'Opened USB switch PCB with red and blue wires soldered to the button and LED pads',
      fr: 'Circuit du switch USB ouvert, avec des fils rouges et bleus soudés sur les pads du bouton et des LED',
    },
    focal: '50% 45%',
  },
  'kvm-under-desk': {
    alt: {
      en: 'Modded USB switch mounted under the desk with the ESP32 attached and cables tied',
      fr: 'Le switch USB modifié fixé sous le bureau, avec l’ESP32 et les câbles bien rangés',
    },
    focal: '50% 55%',
  },
  'kvm-esp32': {
    alt: {
      en: 'The ESP32 wired to the USB switch next to its cables',
      fr: 'L’ESP32 câblé au switch USB, à côté de ses câbles',
    },
  },

  // Rack and storage
  'rack-night': {
    alt: {
      en: 'The black cabinet rack at night, status LEDs lit on the switch, Raspberry Pi, laptops, NAS bay and mini PC',
      fr: 'Le rack en meuble noir de nuit, LED allumées sur le switch, le Raspberry Pi, les portables, la baie NAS et le mini PC',
    },
    focal: '50% 45%',
  },
  'rack-paint': {
    alt: { en: 'Wooden cabinet being spray-painted black', fr: 'Meuble en bois en train d’être peint en noir à la bombe' },
    focal: '50% 55%',
  },
  'rack-front': {
    alt: {
      en: 'The rack from the front: switch, Raspberry Pi, laptops and mini PC on their shelves',
      fr: 'Le rack de face : switch, Raspberry Pi, portables et mini PC sur leurs étagères',
    },
  },
  'rack-side': {
    alt: { en: 'The rack from the side, with its cables', fr: 'Le rack de côté, avec ses câbles' },
  },
  'storage-bay': {
    alt: {
      en: 'Four-bay drive enclosure with four 4 TB Seagate IronWolf drives',
      fr: 'Baie de stockage à quatre emplacements avec quatre disques Seagate IronWolf de 4 To',
    },
    focal: '50% 55%',
  },
  'storage-cabinet': {
    alt: {
      en: 'The NAS enclosure and laptops on a shelf of the rack',
      fr: 'La baie NAS et les portables sur une étagère du rack',
    },
  },

  // Living-room TV
  'ambilight-abstract': {
    alt: {
      en: 'TV with ambilight glowing pink and purple around an abstract visual',
      fr: 'Télé avec l’Ambilight en rose et violet autour d’un visuel abstrait',
    },
    focal: '50% 45%',
  },
  'ambilight-game': {
    alt: {
      en: 'Ambilight glowing green, blue and orange around a game scene',
      fr: 'Ambilight en vert, bleu et orange autour d’une scène de jeu',
    },
  },

  // Voice satellite
  'voice-satellite-build': {
    alt: {
      en: 'Voice satellite build: ESP32-S3 devkit wired to an I2S microphone, an amplifier and two small speakers',
      fr: 'Le satellite vocal : un devkit ESP32-S3 câblé à un micro I2S, un ampli et deux petits haut-parleurs',
    },
    focal: '50% 60%',
  },
  'voice-satellite-mic': {
    alt: { en: 'INMP441 I2S microphone close-up', fr: 'Gros plan du micro I2S INMP441' },
  },
  'voice-satellite-amp': {
    alt: { en: 'MAX98357A amplifier close-up', fr: 'Gros plan de l’ampli MAX98357A' },
  },
  'voice-satellite-esp32': {
    alt: { en: 'ESP32-S3 devkit with its wiring', fr: 'Le devkit ESP32-S3 et son câblage' },
  },

  // Speakers
  'speakers-wiring': {
    alt: {
      en: 'ESP32-WROVER wired to a purple PCM5102 DAC, sitting on two black project boxes',
      fr: 'ESP32-WROVER câblé à un DAC PCM5102 violet, posé sur deux boîtiers noirs',
    },
    focal: '55% 50%',
  },
  'speakers-dac-pads': {
    alt: {
      en: 'Back of the PCM5102 DAC showing the H1L to H4L solder pads',
      fr: 'Dos du DAC PCM5102 avec les pads de soudure H1L à H4L',
    },
  },
  'speakers-dac-front': { alt: { en: 'The front of the PCM5102 board', fr: 'L’avant de la carte PCM5102' } },
  'speakers-box': {
    alt: {
      en: 'Closed black vented project box with a red LED glowing',
      fr: 'Boîtier noir ventilé fermé, avec une LED rouge allumée',
    },
  },
  'speakers-esp32': {
    alt: {
      en: 'The ESP32 running on top of its project box, red LED lit',
      fr: 'L’ESP32 en marche sur son boîtier, LED rouge allumée',
    },
  },
  'speakers-cr3-front': {
    alt: {
      en: 'Mackie CR3 Limited Edition powered speakers, front',
      fr: 'Enceintes actives Mackie CR3 Limited Edition, de face',
    },
    focal: '50% 40%',
  },
  'speakers-cr3-close': {
    alt: { en: 'Close-up of a Mackie CR3 speaker', fr: 'Gros plan d’une enceinte Mackie CR3' },
  },
  'speakers-cr3-back': {
    alt: {
      en: 'The RCA inputs on the back of the powered CR3',
      fr: 'Les entrées RCA à l’arrière de la CR3 active',
    },
  },

  // Uses
  'desk-setup': {
    alt: {
      en: 'The desk setup: black standing desk with a vertical and a landscape monitor showing cat wallpapers, a gaming PC and a mic arm',
      fr: 'Le bureau : un bureau assis-debout noir avec un écran vertical et un écran paysage aux fonds d’écran de chat, un PC gaming et un bras de micro',
    },
    focal: '50% 45%',
  },
  'desk-cat': {
    alt: {
      en: 'The desk with a tabby cat sitting on the gaming chair, a cat wallpaper on the vertical monitor, a Canon camera on a monitor arm, a mic arm and a light',
      fr: 'Le bureau avec un chat tigré assis sur la chaise gaming, un fond d’écran de chat sur l’écran vertical, un appareil Canon sur un bras, un bras de micro et une lampe',
    },
    focal: '50% 40%',
  },
  'cat-on-pc': {
    alt: {
      en: 'A black cat sitting on top of the ROG Hyperion PC case, looking down',
      fr: 'Un chat noir assis sur le boîtier ROG Hyperion, le regard vers le bas',
    },
    focal: '55% 40%',
  },
  'cat-on-pc-sleeping': {
    alt: {
      en: 'A black cat asleep on top of the PC case',
      fr: 'Un chat noir endormi sur le boîtier du PC',
    },
  },
  'laptop-open': {
    alt: {
      en: 'ASUS ROG Zephyrus G14 open on the desk, three-quarter view',
      fr: 'L’ASUS ROG Zephyrus G14 ouvert sur le bureau, vu de trois quarts',
    },
    focal: '50% 55%',
  },
  'laptop-lid': {
    alt: { en: 'Laptop lid with the AniMe Matrix dot pattern', fr: 'Le capot du portable et son motif à points AniMe Matrix' },
    focal: '50% 50%',
  },
  'laptop-closed': {
    alt: { en: 'The Zephyrus G14 closed on the desk', fr: 'Le Zephyrus G14 fermé sur le bureau' },
  },
  keyboard: {
    alt: { en: 'Close-up of the Logitech G915 TKL keyboard', fr: 'Gros plan du clavier Logitech G915 TKL' },
  },
  'pc-parts': {
    alt: { en: 'The Intel Core i7-13700K box before the build', fr: 'La boîte de l’Intel Core i7-13700K avant le montage' },
  },
  'pc-build': {
    alt: {
      en: 'Motherboard installed in the case during the build',
      fr: 'La carte mère installée dans le boîtier pendant le montage',
    },
  },
  'pc-case': {
    alt: { en: 'The ROG Hyperion case, empty', fr: 'Le boîtier ROG Hyperion, vide' },
  },
  'pc-gpu': {
    alt: { en: 'The ROG Strix RTX 4080 graphics card', fr: 'La carte graphique ROG Strix RTX 4080' },
  },
  'pc-rgb': {
    alt: {
      en: 'The finished PC with white and blue RGB lighting',
      fr: 'Le PC terminé, éclairé en RGB blanc et bleu',
    },
  },
  'pc-rgb-side': {
    alt: {
      en: 'The finished PC lit up with white and blue RGB and Strimer cables',
      fr: 'Le PC terminé, éclairé en RGB blanc et bleu avec les câbles Strimer',
    },
  },
  'pc-gallery-flatlay': {
    alt: {
      en: 'All the boxed parts laid out on the desk before the build: ROG motherboard, cooler, PSU, Herculx holder, RAM and Strimer cables',
      fr: 'Toutes les pièces en boîte posées sur le bureau avant le montage : carte mère ROG, watercooling, alimentation, support Herculx, RAM et câbles Strimer',
    },
    focal: '50% 60%',
  },
  'pc-gallery-case': {
    alt: { en: 'The empty ASUS ROG Hyperion case', fr: 'Le boîtier ASUS ROG Hyperion, vide' },
    focal: '55% 50%',
  },
  'pc-gallery-motherboard': {
    alt: {
      en: 'Close-up of the ROG Strix Z790-E motherboard around the CPU socket',
      fr: 'Gros plan de la carte mère ROG Strix Z790-E autour du socket du processeur',
    },
    focal: '50% 45%',
  },
  'pc-gallery-cpu': {
    alt: { en: 'The Intel Core i7-13700K box', fr: 'La boîte de l’Intel Core i7-13700K' },
    focal: '55% 45%',
  },
  'pc-gallery-ram': {
    alt: {
      en: 'The G.Skill Trident Z5 RGB DDR5 kit in its box',
      fr: 'Le kit G.Skill Trident Z5 RGB DDR5 dans sa boîte',
    },
    focal: '50% 60%',
  },
  'pc-gallery-ssd': {
    alt: {
      en: 'Two Samsung 990 Pro 2 TB NVMe drives with their boxes',
      fr: 'Deux SSD NVMe Samsung 990 Pro 2 To avec leurs boîtes',
    },
    focal: '50% 50%',
  },
  'pc-gallery-gpu': {
    alt: {
      en: 'The ROG Strix GeForce RTX 4080 graphics card, backplate up',
      fr: 'La carte graphique ROG Strix GeForce RTX 4080, backplate visible',
    },
    focal: '50% 50%',
  },
  'pc-gallery-lights-on': {
    alt: {
      en: 'The finished PC in the Hyperion case, lit in white and blue',
      fr: 'Le PC terminé dans le boîtier Hyperion, éclairé en blanc et bleu',
    },
    focal: '45% 55%',
  },
} as const satisfies Record<GeneratedImageName, MediaMeta>;
