const smallArray=['S','Small','34 Inches']
const mediumArray=['M','Medium','36 Inches','38 Inches']
const largeArray=['L','Large','40 Inches','42 Inches']
const xlargeArray=['XL','XLARGE','44 Inches','46 Inches','48 Inches']
const xxlargeARray=['XXL','XXLarge','50 Inches','52 Inches','54 Inches']
const descriptionToSize=(desc)=>{
    
    switch(desc){
        case 'Small':
        case 'M':
        case 'MEDIUM':
        case '36 Inches':
        case '38 Inches':
            return('M')
        case 'Standard':
        case 'M':
        case 'MEDIUM':
        case '36 Inches':
        case '38 Inches':
            return('M')
    }
}