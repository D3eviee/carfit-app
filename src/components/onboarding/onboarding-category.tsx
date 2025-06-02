import { useOnboardingStore } from '@/lib/store';
import { OnboardingCategoryItem } from './onboarding-category-item';
import { SERVICES_CATEGORIES } from '@/lib/data'; 

export default function OnboardingCategory({ onClick = () => {} }){
    //DEFINING FORM TYPES
    type OnboardingCategory = { businessCategory: string };
    const setData = useOnboardingStore((state)=>state.setData)
  
    //FUNCTION FOR HANDLING FORM
    const handleClick = (categoryName: string) => {
      const data: OnboardingCategory = { businessCategory: categoryName }
      setData(data)
      onClick()
  }

  return(
      <div>
        <h4 className='text-sm text-[#777777] font-extralight'>Kategoria</h4>
        <div className='box-border max-h-[350px] overflow-scroll mt-3 '>
          {SERVICES_CATEGORIES.map((category) => <OnboardingCategoryItem key={category.name} categoryName={category.name} onClick={()=>handleClick(`${category.name}`)} /> 
          )}
        </div>
      </div>    
  )
}