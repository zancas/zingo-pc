import {
  AccordionItemButton,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import styles from "../Dashboard.module.css";
import cstyles from "../../common/Common.module.css";
import { AddressBalance } from "../../appstate";
import Utils from "../../../utils/utils"; 

type AddressBalanceItemProps = {
  currencyName: string;
  zecPrice: number;
  item: AddressBalance;
};

const AddressBalanceItem = ({ currencyName, zecPrice, item }: AddressBalanceItemProps) => {
  const { bigPart, smallPart } = Utils.splitZecAmountIntoBigSmall(Math.abs(item.balance));
  
  return (
    <AccordionItem key={item.label} className={[cstyles.well, cstyles.margintopsmall].join(" ")} uuid={item.address}>
      <AccordionItemHeading>
        <AccordionItemButton className={cstyles.accordionHeader}>
          <div className={[cstyles.flexspacebetween].join(" ")}>
            <div>
              <div className={[cstyles.verticalflex].join(" ")}>
                {item.address.length < 80 ? item.address : Utils.splitStringIntoChunks(item.address, 3).map(item => <div key={item}>{item}</div>)}
              </div>
              {/* Add label displaying receiver types */}
              {item.receivers && (
                <div className={[cstyles.small, cstyles.padtopsmall, cstyles.sublight].join(" ")}>
                  Address type: {Utils.getReceivers(item.receivers).join(" + ")}
                </div>
              )}              
              {item.containsPending && (
                <div className={[cstyles.red, cstyles.small, cstyles.padtopsmall].join(" ")}>
                  Some transactions are pending. Balances may change.
                </div>
              )}
            </div>
            <div className={[styles.txamount, cstyles.right].join(" ")}>
              <div>
                <span>
                  {currencyName} {bigPart}
                </span>
                <span className={[cstyles.small, cstyles.zecsmallpart].join(" ")}>{smallPart}</span>
              </div>
              <div className={[cstyles.sublight, cstyles.small, cstyles.padtopsmall].join(" ")}>
                {Utils.getZecToUsdString(zecPrice, Math.abs(item.balance))}
              </div>
            </div>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel />
    </AccordionItem>
  );
};

export default AddressBalanceItem;
