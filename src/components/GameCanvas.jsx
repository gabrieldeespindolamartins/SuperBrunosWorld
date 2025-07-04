import { Stage, Sprite} from '@pixi/react'; //importando os comandos Stage e Sprite do Pixi
import background from '../assets/background.png'; //importando imagem do background
import bruno from '../assets/bruno.png'; //importando sprite do bruno

const GameCanvas = () => {
    return (
        //definindo Stage (stage é o background)
        <Stage width={800} height={600} options={{ backgroundColor: 0x1099bb }}> 
            {/*Definindo imagem do background */}
            <Sprite image={background} x={0} y={0} />
            {/*Definindo sprite do bruno */}
            <Sprite image={bruno} x={100} y={100}/>
        </Stage>
    )
}

const [position, setPosition] = useState({ x: 100, y: 300});

useEffect(() => {
    const handleKeyDown = (e) => {
        setPosition(pos => {
            switch (e.key) {
                case 'ArrowRight': return {...pos, x: pos.x + 5}; //move pra direita
                case 'ArrowLeft': return {...pos, x: pos.x - 5}; //move pra esquerda
                case 'ArrowUp': return {...pos, y: pos.y - 5}; //move pra cima
                case 'ArrowDown': return {...pos, y: pos.y + 5}; //move pra baixo
                default: return pos;
            }
        });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
})

export default GameCanvas;