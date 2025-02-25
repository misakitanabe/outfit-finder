import { useState } from "react";
import ClothesPanel from "./ClothesPanel";
import Dropdown from "./Dropdown";
import "./styles/Components.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function ImageDisplayTabs(props) {
    const [sortValue, setSortValue] = useState("none");

    const clothes = [
        { category: "tops", path: "../../images/green-top.png", wornFrequency: 1 },
        { category: "pants", path: "../../images/jeans.png", wornFrequency: 9 },
        { category: "skirts", path: "../../images/pink-skirt.webp" , wornFrequency: 2 },
        { category: "shoes", path: "../../images/shoe.webp", wornFrequency: 3 },
        { category: "accessories", path: "../../images/necklace.png", wornFrequency: 1 },
        { category: "jackets", path: "../../images/jacket.png", wornFrequency: 4 },
    ];

    const sortValues = [
        { value: "none", label: "None" },
        { value: "frequency", label: "Most Frequently Worn" },
    ];

    return (
        <>
            <div className="sort-container">
                <p className="sort-text">Sort By:</p>
                <Dropdown 
                    label='' 
                    options={sortValues} 
                    containerStyle={{ display: 'inline-block' }} 
                    dropdownStyle={{ width: '12rem', height: '2rem', borderRadius: '0.25rem' }} 
                    handleDropdownChange={(e) => {setSortValue(e.target.value)}}
                />
            </div>
            <Tabs style={{ backgroundColor: 'var(--color-background-page)', fontSize: '1.25rem' }}>
            
                <TabList style={{ margin: '0 1rem', borderBottom: '1px solid transparent', width: '85%'}}>
                    {/* Show All Tab */}
                    <Tab 
                        className="category-tab react-tabs__tab"
                        >
                        All
                    </Tab>
                    {/* Passed in Categories Tabs */}
                    {props.filters.map((filter, index) => (
                        <Tab 
                            className="category-tab react-tabs__tab"
                            key={index}>
                            {filter.label}
                        </Tab>
                    ))}
                </TabList>

                {/* Show All Panel */}
                <TabPanel>
                    <ClothesPanel clothes={clothes} sortValue={sortValue} />
                </TabPanel>

                {/* Passed in Categories Panels */}
                {props.filters.map((filter, index) => (
                    <TabPanel key={index}>
                        <ClothesPanel filter={filter.label} clothes={clothes} sortValue={sortValue} />
                    </TabPanel>
                ))}
            </Tabs>
        </>
    );
}

export default ImageDisplayTabs;