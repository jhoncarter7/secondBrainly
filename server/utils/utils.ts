export const random = (number: number) => {
    const position = "shjvshadvjkas2asndbvaasdcmnv213228yr23rbvrh334i3vx34"
    const length = position.length;
    let rand = "";
    for(let i=0; i<number; i++){
       rand += position[Math.floor(Math.random()* length)]
    }

    return rand;
}