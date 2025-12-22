"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Star, Filter, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useTranslate } from "@/hooks/use-translate"
import { useRouter } from "next/navigation"

const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    platform: "hbo",
    poster: "/placeholder.svg?height=300&width=200&text=Dark+Knight",
    description: "Description of The Dark Knight",
  },
  {
    id: 2,
    title: "Stranger Things",
    year: 2016,
    rating: 8.7,
    genre: "Sci-Fi",
    platform: "netflix",
    poster: "/images/stranger-things-poster.png",
    description: "Description of Stranger Things",
    youtubeUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
  },
  {
    id: 3,
    title: "The Mandalorian",
    year: 2019,
    rating: 8.8,
    genre: "Sci-Fi",
    platform: "disney",
    poster: "/placeholder.svg?height=300&width=200&text=Mandalorian",
    description: "Description of The Mandalorian",
  },
  {
    id: 4,
    title: "The Boys",
    year: 2019,
    rating: 8.7,
    genre: "Action",
    platform: "prime",
    poster: "/placeholder.svg?height=300&width=200&text=The+Boys",
    description: "Description of The Boys",
  },
  {
    id: 5,
    title: "Ted Lasso",
    year: 2020,
    rating: 8.8,
    genre: "Comedy",
    platform: "apple",
    poster: "/placeholder.svg?height=300&width=200&text=Ted+Lasso",
    description: "Description of Ted Lasso",
  },
  {
    id: 6,
    title: "Yellowstone",
    year: 2018,
    rating: 8.7,
    genre: "Drama",
    platform: "paramount",
    poster: "/placeholder.svg?height=300&width=200&text=Yellowstone",
    description: "Description of Yellowstone",
  },
  // Additional 80 Movies
  { id: 101, title: "Avengers: Endgame", year: 2019, rating: 8.4, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Endgame", description: "Epic superhero finale" },
  { id: 102, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Matrix", description: "Reality-bending action" },
  { id: 103, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Pulp+Fiction", description: "Tarantino masterpiece" },
  { id: 104, title: "The Godfather", year: 1972, rating: 9.2, genre: "Crime", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Godfather", description: "Mafia family saga" },
  { id: 105, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Inception", description: "Dream within a dream" },
  { id: 106, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Shawshank", description: "Prison drama classic" },
  { id: 107, title: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Forrest+Gump", description: "Life is like a box of chocolates" },
  { id: 108, title: "The Lion King", year: 2019, rating: 6.8, genre: "Animation", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Lion+King", description: "Live-action remake" },
  { id: 109, title: "Titanic", year: 1997, rating: 7.8, genre: "Romance", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Titanic", description: "Epic love story" },
  { id: 110, title: "Avatar", year: 2009, rating: 7.8, genre: "Sci-Fi", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Avatar", description: "Pandora adventure" },
  { id: 111, title: "Joker", year: 2019, rating: 8.4, genre: "Drama", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Joker", description: "Origin story" },
  { id: 112, title: "Spider-Man: No Way Home", year: 2021, rating: 8.4, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Spiderman", description: "Multiverse adventure" },
  { id: 113, title: "Top Gun: Maverick", year: 2022, rating: 8.3, genre: "Action", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Top+Gun", description: "High-flying sequel" },
  { id: 114, title: "Black Panther", year: 2018, rating: 7.3, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Black+Panther", description: "Wakanda forever" },
  { id: 115, title: "Dune", year: 2021, rating: 8.0, genre: "Sci-Fi", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Dune", description: "Epic space opera" },
  { id: 116, title: "The Batman", year: 2022, rating: 7.8, genre: "Action", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Batman", description: "Dark knight returns" },
  { id: 117, title: "Wonder Woman 1984", year: 2020, rating: 5.4, genre: "Action", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Wonder+Woman", description: "80s superhero adventure" },
  { id: 118, title: "Fast & Furious 9", year: 2021, rating: 5.2, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Fast+9", description: "Family action" },
  { id: 119, title: "No Time to Die", year: 2021, rating: 7.3, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Bond", description: "Final Bond film" },
  { id: 120, title: "Eternals", year: 2021, rating: 6.3, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Eternals", description: "Cosmic heroes" },
  { id: 121, title: "Doctor Strange 2", year: 2022, rating: 6.9, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Dr+Strange", description: "Multiverse madness" },
  { id: 122, title: "Thor: Love and Thunder", year: 2022, rating: 6.2, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Thor", description: "God of thunder returns" },
  { id: 123, title: "Lightyear", year: 2022, rating: 5.1, genre: "Animation", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Lightyear", description: "Buzz origin story" },
  { id: 124, title: "Minions: The Rise of Gru", year: 2022, rating: 6.5, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Minions", description: "Yellow mayhem" },
  { id: 125, title: "Encanto", year: 2021, rating: 7.2, genre: "Animation", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Encanto", description: "Family magic" },
  { id: 126, title: "Red Notice", year: 2021, rating: 6.3, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Red+Notice", description: "Art heist thriller" },
  { id: 127, title: "Don't Look Up", year: 2021, rating: 7.2, genre: "Comedy", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Dont+Look+Up", description: "Disaster satire" },
  { id: 128, title: "The Power of the Dog", year: 2021, rating: 6.8, genre: "Drama", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Power+Dog", description: "Western drama" },
  { id: 129, title: "Turning Red", year: 2022, rating: 7.0, genre: "Animation", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Turning+Red", description: "Coming of age" },
  { id: 130, title: "The Adam Project", year: 2022, rating: 6.7, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Adam+Project", description: "Time travel adventure" },
  { id: 131, title: "Bullet Train", year: 2022, rating: 7.3, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Bullet+Train", description: "High-speed thriller" },
  { id: 132, title: "Elvis", year: 2022, rating: 7.3, genre: "Biography", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Elvis", description: "King of rock story" },
  { id: 133, title: "Glass Onion", year: 2022, rating: 7.2, genre: "Mystery", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Glass+Onion", description: "Knives Out sequel" },
  { id: 134, title: "The Menu", year: 2022, rating: 7.2, genre: "Horror", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Menu", description: "Culinary thriller" },
  { id: 135, title: "Nope", year: 2022, rating: 6.8, genre: "Horror", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Nope", description: "UFO mystery" },
  { id: 136, title: "Barbarian", year: 2022, rating: 7.0, genre: "Horror", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Barbarian", description: "House of horrors" },
  { id: 137, title: "The Northman", year: 2022, rating: 7.0, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Northman", description: "Viking revenge" },
  { id: 138, title: "Everything Everywhere", year: 2022, rating: 7.8, genre: "Sci-Fi", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Everything", description: "Multiverse chaos" },
  { id: 139, title: "Morbius", year: 2022, rating: 5.2, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Morbius", description: "Living vampire" },
  { id: 140, title: "Sonic 2", year: 2022, rating: 6.5, genre: "Action", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Sonic+2", description: "Blue hedgehog returns" },
  { id: 141, title: "The Bad Guys", year: 2022, rating: 6.8, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Bad+Guys", description: "Animal heist crew" },
  { id: 142, title: "Fantastic Beasts 3", year: 2022, rating: 6.2, genre: "Fantasy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Beasts+3", description: "Wizarding world" },
  { id: 143, title: "Jurassic World Dominion", year: 2022, rating: 5.6, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Jurassic", description: "Dinosaur finale" },
  { id: 144, title: "Uncharted", year: 2022, rating: 6.3, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Uncharted", description: "Treasure hunt adventure" },
  { id: 145, title: "The Lost City", year: 2022, rating: 6.1, genre: "Comedy", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Lost+City", description: "Adventure comedy" },
  { id: 146, title: "Scream", year: 2022, rating: 6.3, genre: "Horror", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Scream", description: "Horror reboot" },
  { id: 147, title: "X", year: 2022, rating: 6.6, genre: "Horror", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=X", description: "70s horror" },
  { id: 148, title: "The Batman", year: 2022, rating: 7.8, genre: "Action", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Batman+2022", description: "Dark detective story" },
  { id: 149, title: "House of Gucci", year: 2021, rating: 6.6, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Gucci", description: "Fashion family drama" },
  { id: 150, title: "Spencer", year: 2021, rating: 6.6, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Spencer", description: "Princess Diana story" },
  { id: 151, title: "Dune: Part Two", year: 2024, rating: 8.8, genre: "Sci-Fi", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Dune+2", description: "Desert power continues" },
  { id: 152, title: "Oppenheimer", year: 2023, rating: 8.4, genre: "Biography", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Oppenheimer", description: "Atomic bomb creator" },
  { id: 153, title: "Barbie", year: 2023, rating: 6.9, genre: "Comedy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Barbie", description: "Pink fantasy world" },
  { id: 154, title: "The Flash", year: 2023, rating: 6.9, genre: "Action", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Flash", description: "Speedster multiverse" },
  { id: 155, title: "John Wick 4", year: 2023, rating: 7.7, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Wick+4", description: "Assassin's final chapter" },
  { id: 156, title: "Guardians 3", year: 2023, rating: 7.9, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Guardians+3", description: "Galaxy heroes finale" },
  { id: 157, title: "Indiana Jones 5", year: 2023, rating: 6.5, genre: "Adventure", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Indy+5", description: "Final adventure" },
  { id: 158, title: "Transformers 7", year: 2023, rating: 6.0, genre: "Action", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Transformers", description: "Rise of the Beasts" },
  { id: 159, title: "Spider-Verse 2", year: 2023, rating: 8.7, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Spider+Verse", description: "Multiverse spider-people" },
  { id: 160, title: "The Little Mermaid", year: 2023, rating: 7.2, genre: "Musical", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Mermaid", description: "Live-action underwater" },
  { id: 161, title: "Fast X", year: 2023, rating: 5.8, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Fast+X", description: "Family racing continues" },
  { id: 162, title: "Mission Impossible 7", year: 2023, rating: 7.7, genre: "Action", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=MI+7", description: "Impossible stunts" },
  { id: 163, title: "The Nun 2", year: 2023, rating: 5.6, genre: "Horror", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Nun+2", description: "Demonic sequel" },
  { id: 164, title: "Scream 6", year: 2023, rating: 6.5, genre: "Horror", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Scream+6", description: "Ghostface returns" },
  { id: 165, title: "Avatar 2", year: 2022, rating: 7.6, genre: "Sci-Fi", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Avatar+2", description: "Way of Water" },
  { id: 166, title: "Black Adam", year: 2022, rating: 6.2, genre: "Action", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Black+Adam", description: "Antihero awakens" },
  { id: 167, title: "Wakanda Forever", year: 2022, rating: 6.7, genre: "Action", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Wakanda", description: "Panther legacy" },
  { id: 168, title: "The Woman King", year: 2022, rating: 6.9, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Woman+King", description: "Warrior women" },
  { id: 169, title: "Amsterdam", year: 2022, rating: 6.1, genre: "Mystery", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Amsterdam", description: "1930s conspiracy" },
  { id: 170, title: "Smile", year: 2022, rating: 6.5, genre: "Horror", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Smile", description: "Sinister grin" },
  { id: 171, title: "Halloween Ends", year: 2022, rating: 5.0, genre: "Horror", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Halloween", description: "Michael Myers finale" },
  { id: 172, title: "Babylon", year: 2022, rating: 7.1, genre: "Drama", platform: "paramount", poster: "/placeholder.svg?height=300&width=200&text=Babylon", description: "1920s Hollywood excess" },
  { id: 173, title: "The Fabelmans", year: 2022, rating: 7.5, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Fabelmans", description: "Spielberg's youth" },
  { id: 174, title: "Tar", year: 2022, rating: 7.4, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Tar", description: "Conductor's downfall" },
  { id: 175, title: "The Whale", year: 2022, rating: 7.7, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Whale", description: "Reclusive teacher" },
  { id: 176, title: "Triangle of Sadness", year: 2022, rating: 7.3, genre: "Comedy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Triangle", description: "Luxury yacht satire" },
  { id: 177, title: "RRR", year: 2022, rating: 7.9, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=RRR", description: "Indian epic action" },
  { id: 178, title: "The Banshees", year: 2022, rating: 7.7, genre: "Comedy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Banshees", description: "Irish dark comedy" },
  { id: 179, title: "Women Talking", year: 2022, rating: 6.9, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Women+Talk", description: "Colony women's choice" },
  { id: 180, title: "She Said", year: 2022, rating: 7.2, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=She+Said", description: "Weinstein investigation" },
  { id: 181, title: "Till", year: 2022, rating: 7.2, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Till", description: "Emmett Till story" },
]

const series = [
  {
    id: 7,
    title: "Breaking Bad",
    year: 2008,
    rating: 9.5,
    genre: "Crime",
    platform: "netflix",
    poster: "/placeholder.svg?height=300&width=200&text=Breaking+Bad",
    description: "Description of Breaking Bad",
  },
  {
    id: 8,
    title: "Game of Thrones",
    year: 2011,
    rating: 9.3,
    genre: "Fantasy",
    platform: "hbo",
    poster: "/placeholder.svg?height=300&width=200&text=Game+of+Thrones",
    description: "Description of Game of Thrones",
  },
  // Additional 60 Famous Series
  { id: 201, title: "The Sopranos", year: 1999, rating: 9.2, genre: "Crime", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Sopranos", description: "Mob boss family life" },
  { id: 202, title: "The Wire", year: 2002, rating: 9.3, genre: "Crime", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Wire", description: "Baltimore drug trade" },
  { id: 203, title: "Mad Men", year: 2007, rating: 8.7, genre: "Drama", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Mad+Men", description: "1960s advertising" },
  { id: 204, title: "Lost", year: 2004, rating: 8.3, genre: "Mystery", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Lost", description: "Island survivors mystery" },
  { id: 205, title: "Friends", year: 1994, rating: 8.9, genre: "Comedy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Friends", description: "NYC friends sitcom" },
  { id: 206, title: "The Office", year: 2005, rating: 9.0, genre: "Comedy", platform: "peacock", poster: "/placeholder.svg?height=300&width=200&text=Office", description: "Mockumentary workplace" },
  { id: 207, title: "Stranger Things", year: 2016, rating: 8.7, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Stranger", description: "80s supernatural mystery" },
  { id: 208, title: "The Crown", year: 2016, rating: 8.7, genre: "Drama", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Crown", description: "Royal family drama" },
  { id: 209, title: "Better Call Saul", year: 2015, rating: 8.9, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Saul", description: "Breaking Bad prequel" },
  { id: 210, title: "House of Cards", year: 2013, rating: 8.7, genre: "Drama", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Cards", description: "Political manipulation" },
  { id: 211, title: "True Detective", year: 2014, rating: 8.9, genre: "Crime", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Detective", description: "Anthology crime series" },
  { id: 212, title: "Westworld", year: 2016, rating: 8.6, genre: "Sci-Fi", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Westworld", description: "AI western theme park" },
  { id: 213, title: "The Mandalorian", year: 2019, rating: 8.7, genre: "Sci-Fi", platform: "disney", poster: "/placeholder.svg?height=300&width=200&text=Mando", description: "Star Wars bounty hunter" },
  { id: 214, title: "Ozark", year: 2017, rating: 8.4, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Ozark", description: "Money laundering family" },
  { id: 215, title: "The Boys", year: 2019, rating: 8.7, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Boys", description: "Dark superhero satire" },
  { id: 216, title: "Succession", year: 2018, rating: 8.8, genre: "Drama", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Succession", description: "Media empire family" },
  { id: 217, title: "The Witcher", year: 2019, rating: 8.2, genre: "Fantasy", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Witcher", description: "Monster hunter adventure" },
  { id: 218, title: "Money Heist", year: 2017, rating: 8.3, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Heist", description: "Spanish bank robbery" },
  { id: 219, title: "Squid Game", year: 2021, rating: 8.0, genre: "Thriller", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Squid", description: "Deadly children's games" },
  { id: 220, title: "The Walking Dead", year: 2010, rating: 8.2, genre: "Horror", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Walking", description: "Zombie apocalypse survival" },
  { id: 221, title: "Dexter", year: 2006, rating: 8.7, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Dexter", description: "Vigilante serial killer" },
  { id: 222, title: "Sherlock", year: 2010, rating: 9.1, genre: "Mystery", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Sherlock", description: "Modern Holmes adaptation" },
  { id: 223, title: "Black Mirror", year: 2011, rating: 8.8, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Mirror", description: "Technology dystopia anthology" },
  { id: 224, title: "The Handmaid's Tale", year: 2017, rating: 8.4, genre: "Drama", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Handmaid", description: "Dystopian reproductive control" },
  { id: 225, title: "Peaky Blinders", year: 2013, rating: 8.8, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Peaky", description: "Birmingham gang family" },
  { id: 226, title: "Narcos", year: 2015, rating: 8.8, genre: "Crime", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Narcos", description: "Colombian drug cartels" },
  { id: 227, title: "Fargo", year: 2014, rating: 8.9, genre: "Crime", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Fargo", description: "Midwest crime anthology" },
  { id: 228, title: "Homeland", year: 2011, rating: 8.3, genre: "Thriller", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Homeland", description: "CIA agent thriller" },
  { id: 229, title: "24", year: 2001, rating: 8.4, genre: "Action", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=24", description: "Real-time action thriller" },
  { id: 230, title: "Prison Break", year: 2005, rating: 8.3, genre: "Action", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Prison", description: "Elaborate escape plan" },
  { id: 231, title: "House MD", year: 2004, rating: 8.7, genre: "Drama", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=House", description: "Genius diagnostician doctor" },
  { id: 232, title: "How I Met Your Mother", year: 2005, rating: 8.3, genre: "Comedy", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=HIMYM", description: "NYC friends love story" },
  { id: 233, title: "The Big Bang Theory", year: 2007, rating: 8.1, genre: "Comedy", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=BigBang", description: "Nerdy physicists sitcom" },
  { id: 234, title: "Vikings", year: 2013, rating: 8.5, genre: "Action", platform: "prime", poster: "/placeholder.svg?height=300&width=200&text=Vikings", description: "Norse warrior adventures" },
  { id: 235, title: "The Last Kingdom", year: 2015, rating: 8.5, genre: "Action", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Kingdom", description: "Anglo-Saxon England" },
  { id: 236, title: "Boardwalk Empire", year: 2010, rating: 8.6, genre: "Crime", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Boardwalk", description: "Prohibition era Atlantic City" },
  { id: 237, title: "Band of Brothers", year: 2001, rating: 9.4, genre: "War", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Brothers", description: "WWII paratroopers" },
  { id: 238, title: "The Pacific", year: 2010, rating: 8.3, genre: "War", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Pacific", description: "Pacific theater WWII" },
  { id: 239, title: "Chernobyl", year: 2019, rating: 9.4, genre: "Drama", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Chernobyl", description: "Nuclear disaster miniseries" },
  { id: 240, title: "Mare of Easttown", year: 2021, rating: 8.4, genre: "Crime", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=Mare", description: "Small town detective" },
  { id: 241, title: "The Queen's Gambit", year: 2020, rating: 8.5, genre: "Drama", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Queens", description: "Chess prodigy coming of age" },
  { id: 242, title: "Bridgerton", year: 2020, rating: 7.3, genre: "Romance", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Bridgerton", description: "Regency era romance" },
  { id: 243, title: "The Umbrella Academy", year: 2019, rating: 7.9, genre: "Sci-Fi", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Umbrella", description: "Dysfunctional superhero family" },
  { id: 244, title: "Lucifer", year: 2016, rating: 8.1, genre: "Fantasy", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Lucifer", description: "Devil helps LAPD" },
  { id: 245, title: "The Good Place", year: 2016, rating: 8.2, genre: "Comedy", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=GoodPlace", description: "Afterlife comedy philosophy" },
  { id: 246, title: "Brooklyn Nine-Nine", year: 2013, rating: 8.4, genre: "Comedy", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=B99", description: "Police precinct comedy" },
  { id: 247, title: "Parks and Recreation", year: 2009, rating: 8.6, genre: "Comedy", platform: "peacock", poster: "/placeholder.svg?height=300&width=200&text=Parks", description: "Local government mockumentary" },
  { id: 248, title: "Arrested Development", year: 2003, rating: 8.7, genre: "Comedy", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Arrested", description: "Dysfunctional wealthy family" },
  { id: 249, title: "Community", year: 2009, rating: 8.5, genre: "Comedy", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Community", description: "Community college study group" },
  { id: 250, title: "Scrubs", year: 2001, rating: 8.4, genre: "Comedy", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Scrubs", description: "Hospital comedy drama" },
  { id: 251, title: "BoJack Horseman", year: 2014, rating: 8.8, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=BoJack", description: "Depressed horse actor" },
  { id: 252, title: "Rick and Morty", year: 2013, rating: 9.1, genre: "Animation", platform: "hbo", poster: "/placeholder.svg?height=300&width=200&text=RickMorty", description: "Sci-fi animated adventures" },
  { id: 253, title: "Avatar: The Last Airbender", year: 2005, rating: 9.3, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=Avatar", description: "Elemental bending adventure" },
  { id: 254, title: "Attack on Titan", year: 2013, rating: 9.0, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Titan", description: "Humanity vs giants" },
  { id: 255, title: "Death Note", year: 2006, rating: 8.9, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=DeathNote", description: "Supernatural justice thriller" },
  { id: 256, title: "One Piece", year: 1999, rating: 9.0, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=OnePiece", description: "Pirate treasure adventure" },
  { id: 257, title: "Demon Slayer", year: 2019, rating: 8.7, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Demon", description: "Demon hunting swordsman" },
  { id: 258, title: "My Hero Academia", year: 2016, rating: 8.6, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Hero", description: "Superhero school adventure" },
  { id: 259, title: "Naruto", year: 2002, rating: 8.4, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=Naruto", description: "Ninja village adventures" },
  { id: 260, title: "Dragon Ball Z", year: 1989, rating: 8.8, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=DBZ", description: "Saiyan warrior battles" },
  { id: 261, title: "One Punch Man", year: 2015, rating: 8.8, genre: "Animation", platform: "hulu", poster: "/placeholder.svg?height=300&width=200&text=OnePunch", description: "Overpowered hero satire" },
  { id: 262, title: "JoJo's Bizarre Adventure", year: 2012, rating: 8.6, genre: "Animation", platform: "netflix", poster: "/placeholder.svg?height=300&width=200&text=JoJo", description: "Generational bizarre adventures" },
]

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const { toast } = useToast()
  const t = useTranslate()
  const router = useRouter()
  const platforms = [
    { id: "netflix", name: "Netflix", color: "bg-red-500" },
    { id: "disney", name: "Disney+", color: "bg-blue-500" },
    { id: "hbo", name: "HBO Max", color: "bg-purple-500" },
    { id: "prime", name: "Prime Video", color: "bg-blue-400" },
    { id: "apple", name: "Apple TV+", color: "bg-gray-500" },
    { id: "paramount", name: "Paramount+", color: "bg-blue-600" },
  ]

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Documentary",
    "Animation",
    "Crime",
    "Fantasy",
    "Adventure",
  ]

  type MediaItem = {
    id: string
    title: string
    genre: string
    platform: string
    youtubeUrl?: string
    description?: string
    poster?: string
  }

  const [content, setContent] = useState<MediaItem[]>([...movies, ...series])
  const [visibleContent, setVisibleContent] = useState<MediaItem[]>(content.slice(0, 8))
  const [loading, setLoading] = useState(false)

  const filteredContent = (items: MediaItem[]) => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === "all" || item.genre === selectedGenre
      const matchesPlatform = selectedPlatform === "all" || item.platform === selectedPlatform
      return matchesSearch && matchesGenre && matchesPlatform
    })
  }

  const handlePlay = (item: MediaItem) => {
    if (item.youtubeUrl) {
      window.open(item.youtubeUrl, "_blank")
      toast({
        title: `Opening ${item.title}`,
        description: "Redirecting...",
      })
    } else {
      router.push(`/watch?title=${item.title}&description=${item.description}&poster=${item.poster}`)
      toast({
        title: `Playing ${item.title}`,
        description: "Redirecting to player...",
      })
    }
  }

  const loadMoreContent = () => {
    setLoading(true)
    setTimeout(() => {
      const nextContent = content.slice(visibleContent.length, visibleContent.length + 4)
      setVisibleContent([...visibleContent, ...nextContent])
      setLoading(false)
    }, 1000)
  }

  const hasMoreContent = visibleContent.length < content.length

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
            {t("library.title")} <span className="text-yellow-500">{t("library.titleHighlight")}</span>
          </h1>
          <p className="responsive-subtitle text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">{t("library.subtitle")}</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder={t("library.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white mobile-focus"
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm w-full sm:w-auto mobile-focus"
              >
                <option value="all">{t("library.filters.allGenres")}</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm w-full sm:w-auto mobile-focus"
              >
                <option value="all">{t("library.filters.allPlatforms")}</option>
                {platforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {platforms.map((platform) => (
            <Card key={platform.id} className="mobile-card bg-gray-900 border-gray-800 touch-element">
              <CardContent className="p-3 sm:p-4 text-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${platform.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xs sm:text-sm`}
                >
                  {platform.name.charAt(0)}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white">{platform.name}</div>
                <div className="text-xs text-gray-400">Titles</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 mb-6 sm:mb-8 h-12 sm:h-auto">
            <TabsTrigger value="movies" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-sm sm:text-base py-2 sm:py-3">
              {t("library.tabs.movies")}
            </TabsTrigger>
            <TabsTrigger value="series" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-sm sm:text-base py-2 sm:py-3">
              {t("library.tabs.series")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {filteredContent(movies).map((movie) => (
                <Card
                  key={movie.id}
                  className="mobile-card bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group cursor-pointer touch-element"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        width={200}
                        height={300}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="mobile-button bg-yellow-500 hover:bg-yellow-600 text-black mr-2 text-xs sm:text-sm"
                          onClick={() => handlePlay(movie)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          {t("library.buttons.play")}
                        </Button>
                        {movie.youtubeUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-xs sm:text-sm"
                            onClick={() => window.open(movie.youtubeUrl, "_blank")}
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        )}
                      </div>
                      <Badge
                        className={`absolute top-2 right-2 ${platforms.find((p) => p.id === movie.platform)?.color} text-white text-xs`}
                      >
                        {platforms.find((p) => p.id === movie.platform)?.name}
                      </Badge>
                    </div>
                    <div className="p-2 sm:p-3 md:p-4">
                      <h3 className="font-semibold text-white mb-1 line-clamp-1 text-sm sm:text-base">{movie.title}</h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mb-2">
                        <span>{movie.year}</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {movie.genre}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="series">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
              {filteredContent(series).map((show) => (
                <Card
                  key={show.id}
                  className="mobile-card bg-gray-900 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group cursor-pointer touch-element"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={show.poster || "/placeholder.svg"}
                        alt={show.title}
                        width={200}
                        height={300}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          className="mobile-button bg-yellow-500 hover:bg-yellow-600 text-black text-xs sm:text-sm"
                          onClick={() => handlePlay(show)}
                        >
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {t("library.buttons.watch")}
                        </Button>
                      </div>
                      <Badge
                        className={`absolute top-2 right-2 ${platforms.find((p) => p.id === show.platform)?.color} text-white text-xs`}
                      >
                        {platforms.find((p) => p.id === show.platform)?.name}
                      </Badge>
                    </div>
                    <div className="p-2 sm:p-3 md:p-4">
                      <h3 className="font-semibold text-white mb-1 line-clamp-1 text-sm sm:text-base">{show.title}</h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mb-2">
                        <span>{show.year}</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span>{show.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {show.genre}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-8 sm:mt-12">
          {hasMoreContent ? (
            <Button
              className="mobile-button-lg bg-yellow-500 hover:bg-yellow-600 text-black px-6 sm:px-8 py-3 active:scale-95"
              onClick={loadMoreContent}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          ) : (
            <p className="text-gray-500">No more content</p>
          )}
        </div>
      </div>
    </div>
  )
}
