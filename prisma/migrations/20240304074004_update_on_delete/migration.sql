-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_companyPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_mAreaId_fkey`;

-- DropForeignKey
ALTER TABLE `Company` DROP FOREIGN KEY `Company_mLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `CompanyContract` DROP FOREIGN KEY `CompanyContract_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `EmployeeCompanyContract` DROP FOREIGN KEY `EmployeeCompanyContract_companyContractId_fkey`;

-- DropForeignKey
ALTER TABLE `EmployeeCompanyContract` DROP FOREIGN KEY `EmployeeCompanyContract_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `EmployeeCompanyContract` DROP FOREIGN KEY `EmployeeCompanyContract_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `Holiday` DROP FOREIGN KEY `Holiday_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `MArea` DROP FOREIGN KEY `MArea_mLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `Timesheet` DROP FOREIGN KEY `Timesheet_employeeId_fkey`;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timesheet` ADD CONSTRAINT `Timesheet_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_companyPlanId_fkey` FOREIGN KEY (`companyPlanId`) REFERENCES `CompanyPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_mLocationId_fkey` FOREIGN KEY (`mLocationId`) REFERENCES `MLocation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_mAreaId_fkey` FOREIGN KEY (`mAreaId`) REFERENCES `MArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Holiday` ADD CONSTRAINT `Holiday_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompanyContract` ADD CONSTRAINT `CompanyContract_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeCompanyContract` ADD CONSTRAINT `EmployeeCompanyContract_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeCompanyContract` ADD CONSTRAINT `EmployeeCompanyContract_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployeeCompanyContract` ADD CONSTRAINT `EmployeeCompanyContract_companyContractId_fkey` FOREIGN KEY (`companyContractId`) REFERENCES `CompanyContract`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MArea` ADD CONSTRAINT `MArea_mLocationId_fkey` FOREIGN KEY (`mLocationId`) REFERENCES `MLocation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
