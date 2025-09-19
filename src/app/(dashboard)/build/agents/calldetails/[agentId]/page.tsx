// project-imports
import Create from 'views/build/EditAgent';
// ==============================|| SAMPLE PAGE ||============================== //
export default async  function SamplePage({ params }) {
   const { agentId } = await params;

  return <Create agentId={agentId} />;
}
