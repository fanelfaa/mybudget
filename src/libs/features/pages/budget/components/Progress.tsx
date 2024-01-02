import { Progress } from "@chakra-ui/react";
import Decimal from "decimal.js";
import { useMemo } from "react";

export type TransactionsProgressProps = {
   amount: number;
   expense: number;
};

export const TransactionsProgress = (props: TransactionsProgressProps) => {
   const isMinus = props.expense > props.amount;

   const progresValue = useMemo(() => {
      if (props.amount === 0) return 0;
      if (props.expense >= props.amount) return 100;
      const amountDes = new Decimal(props.amount);
      const expenseDes = new Decimal(props.expense);

      return expenseDes.dividedBy(amountDes).toNumber() * 100;
   }, [props.amount, props.expense]);

   const progressColorScheme = useMemo(() => {
      if (isMinus) return "red";
      if (progresValue < 70) return "green";
      if (progresValue <= 100) return "blue";
      return "red";
   }, [isMinus, progresValue]);

   return (
      <Progress
         value={progresValue}
         colorScheme={progressColorScheme}
         rounded="base"
         size="sm"
      />
   );
};
