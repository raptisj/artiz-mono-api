# Artiz MoNo API

An API that lists artists and their songs. Authenticated users will be able to perform actions such as liking a song or following an artist.

Technologies used: **Mo**ngoDB, **No**deJS, Docker.

## Features

- custom user auth
- artists list
- single artist
- follow artist
- song list per artists
- liked songs
- create playlists
- user profile

## Generate data

I used ChatGPT to generate the data. To do so youself you can insert the prompts from the `app/content/prompts.md` file.

## Structure of data

### Artist object
```
{
    "artists": [
		{
		    "id": "5a3ce90e-82a1-4e58-8c98-4b02a48dc5fe",
		    "name": "Pat Metheny",
		    "birth_year": 1954,
		    "instrument": "Guitar",
            "genre": "Jazz",
		    "bio": "Pat Metheny is an American jazz guitarist known for his innovative and diverse musical style. He has won numerous awards, including 20 Grammy Awards across various categories. Metheny's work spans jazz fusion, contemporary jazz, and beyond, showcasing his virtuosity and creativity.",
		    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pat_Metheny.jpg/500px-Pat_Metheny.jpg"
		}
	]
}
```

### Song object
```
{
  "songs": [
    {
      "id": "d77eb52b-0707-4bd5-9c23-f3ea69d5b4a1",
      "artist_id": "5a3ce90e-82a1-4e58-8c98-4b02a48dc5fe",
      "title": "Last Train Home",
      "album": "Still Life (Talking)",
      "year": 1987,
      "duration": "5:42",
      "genre": "Jazz Fusion"
    },
  ]
}

```

## Author
John Raptis