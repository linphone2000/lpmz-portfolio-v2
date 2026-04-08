import { PhoneFrame } from '@/components/Common/PhoneFrame';

interface ProjectPreviewProps {
  projectName: string;
  screenshotSrc: string;
}

export const ProjectPreview = ({
  projectName,
  screenshotSrc,
}: ProjectPreviewProps) => {
  return (
    <div className="hidden md:block h-full">
      <div className="relative h-full rounded-2xl bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center p-6 sm:p-8">
        <div className="relative">
          <div className="relative w-30 h-64 sm:w-34 sm:h-72">
            <PhoneFrame
              src={screenshotSrc}
              alt={`${projectName} preview`}
              showHoverEffect={false}
            />
          </div>
          <div className="absolute inset-0 w-40 h-64 sm:w-44 sm:h-72 phone-glow -z-10" />
        </div>
      </div>
    </div>
  );
};

ProjectPreview.displayName = 'ProjectPreview';
