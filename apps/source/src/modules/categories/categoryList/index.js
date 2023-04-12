import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import CategoryHeader from "./CategoryHeader";
import CategoryView from "./CategoryView";

const CategoryListing = () => {
  return (
    <>
      <AppsHeader>
        <CategoryHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <CategoryView />
      </AppsContent>
    </>
  );
};

export default CategoryListing;
