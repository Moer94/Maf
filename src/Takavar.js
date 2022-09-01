class Takavar
{

    Roles = {
        godfather: 'godfather',
        nato: 'nato',
        gerogangir: 'gerogangir',
        doctor: 'doctor',
        takavar: 'takavar',
        karagah: 'karagah',
        tofangdar: 'tofangdar',
        negahban: 'negahban',
        sade1: 'sade1',
        sade2: 'sade2',
    }

    constructor(players)
    {

        this.deck = players
        this.shuffle()
        this.players = []
        for (const role in this.Roles)
        {
            this.players.push({
                role: role,
                id: this.deck.shift(),
                alive: true
            })
        }
        this.deadPlayers = []
        this.days = []
        this.nights = []

        //each night variables
        this.nightShot = 0
        this.nightDrSaves = []
        this.gerogangiri = 0
        this.nightNegahbanSaves = []
        this.tavakarShot = 0
        this.estelamKaragah = 0
        this.actTofangdar = []


        for (let i = 0; i < 10; i++)
        {
            console.error('case shot player ' + i)
            this.nightShot = i
            this.nightDrSaves = [4, 2]
            this.tavakarShot = 3
            console.log('all players', this.players)
            console.log('shot mafia', this.nightShot)
            console.log('id takavar', this.players.find(player => player.role === this.Roles.takavar).id)
            console.log('shot takvar', this.tavakarShot)
            console.log('save dr', this.nightDrSaves)

            this.nightAction({ id: this.nightShot, type: 'natoii', guess: this.Roles.karagah }, null, null, { ids: this.nightDrSaves }, null, null, null)
            console.log('dead players', this.deadPlayers)
            this.resetGame()
        }

    }

    findPlayerById (id)
    {
        return this.players.find(player => player.id === id)
    }

    shuffle ()
    {
        //shuflle the deck
    }

    kill (id)
    {
        this.deadPlayers.push(this.findPlayerById(id))
        this.findPlayerById(id).alive = false
    }
    isMafia (id)
    {
        return this.Roles.godfather === this.findPlayerById(id).role || this.Roles.nato === this.findPlayerById(id).role || this.Roles.gerogangir === this.findPlayerById(id).role
    }

    nightAction (actMafia, actNegahban, gerogangiri, actDoctor, actTakavar, actTofangdar, actKaragah)
    {
        let victim = actMafia.id
        if (actMafia.type === 'shot')
        {
            if (!actDoctor.ids.includes(actMafia.id))
            {
                if (this.Roles.takavar === this.findPlayerById(victim).role && this.actTakavar)
                {
                    if (this.isMafia(actTakavar.id))
                    {
                        console.log('daskhosh Takavar')
                        this.kill(actTakavar.id)
                    } else
                    {
                        console.log('Takavar shot shod vali eshtebah zad')
                        this.kill(victim)
                    }
                } else
                {
                    this.kill(victim)
                    console.log('shot neshast')
                }
            } else
            {
                if (this.Roles.takavar === this.findPlayerById(victim).role)
                {
                    if (actTakavar)
                    {
                        if (this.isMafia(actTakavar.id))
                        {
                            console.log('daskhosh Takavar')
                            this.kill(actTakavar.id)
                        } else
                        {
                            console.log('Takavar shot shod vali eshtebah zad')
                            this.kill(victim)
                        }
                    } else
                    {
                        console.log('Takvar save dr bod , shot shod vali shot nazad')
                    }
                } else
                {
                    console.log('doctor saved the shot')
                }
            }
        } else
        {
            //natoii
            let guess = actMafia.guess
            if (this.findPlayerById(victim).role === guess)
            {
                console.log('mafia guess right')
            } else
            {
                console.log('mafia guess wrong')
            }
        }
    }

    resetGame ()
    {
        this.deadPlayers = []
        for (const player of this.players)
        {
            player.alive = true
        }
    }

    resetNight ()
    {
        this.nightShot = 0
        this.nightDrSaves = []
        this.gerogangiri = 0
        this.nightNegahbanSaves = []
        this.tavakarShot = 0
        this.estelamKaragah = 0
        this.actTofangdar = []
    }

    getAct (id, act)
    {
        let player = this.findPlayerById(id)
        if (player.role === this.Roles.takavar)
        {

        } else if (player.role === this.Roles.doctor)
        {
            return 'doctor'
        } else if (player.role === this.Roles.negahban)
        {
            return 'negahbani'
        } else if (player.role === this.Roles.tofangdar)
        {
            return 'takvar'
        } else if (player.role === this.Roles.karagah)
        {
            return 'Estelam Begir'
        } else if (player.role === this.Roles.sade1 || player.role === this.Roles.sade2)
        {
            return 'Shahr Sade'
        }
    }


}

const game = { takavar: new Takavar([9, 5, 4, 3, 2, 1, 7, 6, 8, 0]) }
window.game = game

export default Takavar
