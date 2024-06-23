import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes, TransformationTypeKey } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface SearchParamProps {
  params: {
    type: TransformationTypeKey; // Adjust the type based on your actual parameter type
  };
}

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
    return null; // Add this line to prevent further execution
  }

  const transformation = transformationTypes[type];
  let user;

  try {
    user = await getUserById(userId);
  } catch (error) {
    console.error('Error fetching user:', error);
    user = null;
  }

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subtitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user ? user._id : ''}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user ? user.creditBalance : 0}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
