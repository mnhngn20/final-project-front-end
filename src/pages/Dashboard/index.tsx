import RecommendList from './RecommendList';
import FuneralPlanList from './FuneralPlanList';

function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <FuneralPlanList />
      <RecommendList />
    </div>
  );
}

export default Dashboard;
