export const Domasno = ({useri}) =>{
    return  (
        <div id = "domasno">
            {Object.values(useri).map((u, index) => (
                <div key={index}>
                    {u.godini >= 18 ?
                        <div>
                            <p>Ime: {u.ime}</p>
                            <p>Prezime: {u.prezime}</p>
                            <p>Godini: {u.godini}</p>
                        </div>
                        :
                        null
                    }
                </div>
            )) }
        </div>
    )
    
}