import { OrbitControls, ScrollControls } from "@react-three/drei"
import { Office } from "./Office"

const Experience = () => {
  return (
	
	<>
		<ambientLight intensity={1} />
		<OrbitControls enableZoom={false}/>
		<ScrollControls pages={3} damping={.25}>
			<Office/>
		</ScrollControls>
	</>
  )
}
export default Experience