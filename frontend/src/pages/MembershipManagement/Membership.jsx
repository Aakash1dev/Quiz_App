import { useState, useEffect } from "react";
import { getAdminPlans } from "@/lib/adminStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Crown, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Membership = () => {
  const { toast } = useToast();
  const [currentTier, setCurrentTier] = useState("Pro Student");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(getAdminPlans());
  }, []);

  const handleSelectPlan = (plan) => {
    if (plan.tierName === currentTier) return;
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleConfirmUpgrade = () => {
    if (!selectedPlan) return;
    setCurrentTier(selectedPlan.tierName);
    setIsCheckoutOpen(false);
    toast({
      title: "🎉 Plan Upgraded Successfully!",
      description: `You are now subscribed to the ${selectedPlan.name} plan.`,
    });
  };

  return (
    <div className="container mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#10bc00] to-[#0b7c00] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-3">
            <Crown className="h-3.5 w-3.5 mr-1" /> MEMBERSHIP &amp; TIERS
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Supercharge Your Learning with EduVisio Pro
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            Unlock unlimited AI quiz generation, advanced analytics, custom study material exports, and priority AI processing.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              Current Active Tier: <strong className="text-yellow-300 font-bold">{currentTier}</strong>
            </span>
          </div>
        </div>
        <Crown className="absolute -right-8 -bottom-8 h-64 w-64 text-white/10 pointer-events-none" />
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.tierName === currentTier;
          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between transition-all ${
                plan.popular
                  ? "border-[#10bc00] shadow-md ring-2 ring-[#10bc00]/20"
                  : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10bc00] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="text-xs min-h-[36px]">{plan.description}</CardDescription>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-2.5 text-xs text-slate-600 pb-6 flex-grow">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#10bc00] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-100">
                <Button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrent}
                  className={`w-full text-xs font-semibold h-9 ${
                    isCurrent
                      ? "bg-slate-100 text-slate-500 border border-slate-200 cursor-default"
                      : plan.popular
                      ? "bg-[#10bc00] hover:bg-[#0b7c00] text-white shadow-sm"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {isCurrent ? "Active Plan" : plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Upgrade Modal Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Crown className="h-5 w-5 text-[#10bc00]" /> Confirm Plan Upgrade
            </DialogTitle>
            <DialogDescription className="text-xs">
              Review your subscription upgrade details below.
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-4 py-2 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{selectedPlan.name}</span>
                  <span className="font-extrabold text-[#10bc00] text-base">{selectedPlan.price}</span>
                </div>
                <p className="text-slate-500">{selectedPlan.description}</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Included Features:</p>
                {selectedPlan.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-600">
                    <Check className="h-3.5 w-3.5 text-[#10bc00]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmUpgrade}
              className="bg-[#10bc00] hover:bg-[#0b7c00] text-white font-semibold"
            >
              Confirm Subscription Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Membership;
