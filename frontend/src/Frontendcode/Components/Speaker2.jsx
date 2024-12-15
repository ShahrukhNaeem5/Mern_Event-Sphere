import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Speaker from "./Speaker";
const Speaker2 = () => {
  const [speakerDetail , setspeakerDetail] = useState([])

  useEffect(() => {
      const fetchSpeaker = async () => {
          try {
              const responseData = await axios.get('http://localhost:5000/api/addspeaker');
              setspeakerDetail(responseData.data);
          } catch (error) {
              console.error('Error fetching Speakers:', error);
          }
      };

      fetchSpeaker();
  }, []); 

  return (
 <>
   <section class="speakers">
<div class="container">
<div class="speaker-inner">
<div class="sepaker-list text-center text-white">
<div class="row">
{
speakerDetail.map((speaker)=>(

<div class=" col-lg-3 col-md-6 p-2">
{/* <div class="speaker-box  position-relative overflow-hidden text-white">
<img class="speaker-image rounded w-100" height={380} src={`/uploads/speakerImages/${speaker.Speakerimage }`} alt="speaker-image"/>
<div class="box-content position-absolute bottom-0 z-1">
<h6 class="speaker-title d-block text-white pb-1"><Link>{speaker.Speakername}</Link>
</h6>
<span class="speaker-post d-block pb-2">{speaker.Speakeremail}</span>
<span class="speaker-post d-block pb-2">{speaker.position}</span>
<ul class="social-link pb-2 ps-0">
<li class="d-inline-block"><a href="#" class="rounded d-block me-1"><i class="fa fa-facebook"></i></a></li>
<li class="d-inline-block"><a href="#" class="rounded d-block me-1"><i class="fa fa-twitter"></i></a></li>
<li class="d-inline-block"><a href="#" class="rounded d-block me-1"><i class="fa fa-pinterest-p"></i></a></li>
</ul>
</div>
</div> */}
        <Speaker key={speaker._id} speaker={speaker} />
</div>

))
}




</div>
</div>
</div>
</div>
</section>
 
 </>
  )
}

export default Speaker2
