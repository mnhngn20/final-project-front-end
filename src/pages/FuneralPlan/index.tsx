import { useParams } from 'react-router-dom';
import QuizLayout from '#/shared/components/layout/QuizLayout';
import { getDefaultActiveKey } from '#/shared/utils/tool';

function FuneralPlan() {
  const { sectionIds } = useParams();
  const currentSection = getDefaultActiveKey(sectionIds)?.returnFoundSection;

  return (
    <QuizLayout
      title={currentSection?.title}
      description={currentSection?.description}
    >
      {currentSection?.element}
    </QuizLayout>
  );
}

export default FuneralPlan;
