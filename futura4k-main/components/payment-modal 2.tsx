"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, Gift, CreditCard, Upload, Check, X, Copy, ExternalLink, Clock, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslate } from "@/hooks/use-translate"

interface Plan {
  id: string
  name: string
  price: string
  duration: string
  popular?: boolean
  savings?: string
}

interface PaymentModalProps {
  plan: Plan
  onClose: () => void
}

export function PaymentModal({ plan, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
  const [giftCardCode, setGiftCardCode] = useState("")
  const [giftCardValid, setGiftCardValid] = useState<boolean | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const t = useTranslate()

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c" },
    { id: "ada", name: "Cardano", symbol: "ADA", address: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wqvs63838e" },
    { id: "monero", name: "Monero", symbol: "XMR", address: "4AdUndXHHZ6cfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skHy7S" },
    { id: "solana", name: "Solana", symbol: "SOL", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" },
  ]

  const giftCardSites = [
    { name: "Amazon", url: "https://www.amazon.com/gift-cards" },
    { name: "Target", url: "https://www.target.com/gift-cards" },
    { name: "Walmart", url: "https://www.walmart.com/gift-cards" },
  ]

  const handlePayment = () => {
    setIsProcessing(true)
    // Redirect to payment website
    window.open("https://payments.futurawatch.com", "_blank")
    
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: t("payment.toast.title"),
        description: t("payment.toast.description"),
      })
      onClose()
    }, 2000)
  }

  const validateGiftCard = (code: string) => {
    // Simulate gift card validation
    const isValid = code.length >= 10 && /^[A-Z0-9]+$/.test(code)
    setGiftCardValid(isValid)
    return isValid
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive",
      })
    }
  }

  const handleConfirmPayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: t("payment.toast.title"),
        description: t("payment.toast.description"),
      })
      onClose()
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedCryptoData = cryptoOptions.find((c) => c.id === selectedCrypto)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-800 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-yellow-500">
            {t("payment.title")} - {plan.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-yellow-500">{t("payment.summary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t("payment.plan")}:</span>
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("payment.duration")}:</span>
                  <span>{plan.duration}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-4">
                  <span>{t("payment.total")}:</span>
                  <span className="text-yellow-500">{plan.price}</span>
                </div>
                {plan.savings && <Badge className="w-full justify-center bg-green-500">{plan.savings}</Badge>}
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="md:col-span-2">
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger
                  value="crypto"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  {t("payment.methods.crypto")}
                </TabsTrigger>
                <TabsTrigger
                  value="giftcard"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  {t("payment.methods.giftCard")}
                </TabsTrigger>
                <TabsTrigger
                  value="paypal"
                  className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t("payment.methods.paypal")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="crypto" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {cryptoOptions.map((crypto) => (
                    <Button
                      key={crypto.id}
                      variant={selectedCrypto === crypto.id ? "default" : "outline"}
                      className={`p-4 h-auto ${
                        selectedCrypto === crypto.id
                          ? "bg-yellow-500 text-black"
                          : "border-gray-700 hover:border-yellow-500"
                      }`}
                      onClick={() => setSelectedCrypto(crypto.id)}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm opacity-70">{crypto.symbol}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedCryptoData && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <Label className="text-yellow-500">{t("payment.crypto.send", { price: plan.price })}:</Label>
                      <div className="mt-2 p-3 bg-black rounded border font-mono text-sm break-all flex items-center justify-between">
                        <span className="flex-1">{selectedCryptoData.address}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(selectedCryptoData.address)}
                          className="ml-2 p-1 h-8 w-8"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{t("payment.crypto.note")}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="giftcard" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-yellow-500">{t("payment.giftCard.purchase")}:</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {giftCardSites.map((site) => (
                        <Button
                          key={site.name}
                          variant="outline"
                          size="sm"
                          className="border-gray-700 hover:border-yellow-500"
                          onClick={() => window.open(site.url, "_blank")}
                        >
                          {site.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="giftcard-code" className="text-yellow-500">
                      {t("payment.giftCard.enterCode")}:
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="giftcard-code"
                        value={giftCardCode}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase()
                          setGiftCardCode(value)
                          if (value.length >= 10) {
                            validateGiftCard(value)
                          } else {
                            setGiftCardValid(null)
                          }
                        }}
                        placeholder={t("payment.giftCard.codePlaceholder")}
                        className="bg-gray-800 border-gray-700"
                        maxLength={20}
                      />
                      {giftCardValid === true && <Check className="w-6 h-6 text-green-500 mt-2" />}
                      {giftCardValid === false && <X className="w-6 h-6 text-red-500 mt-2" />}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-yellow-500">{t("payment.giftCard.uploadPhoto")}:</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">{t("payment.giftCard.uploadInstructions")}</p>
                      <Button variant="outline" size="sm" className="mt-2 border-gray-700">
                        {t("payment.giftCard.chooseFile")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="space-y-4">
                <Card className="bg-yellow-500/10 border-yellow-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-yellow-500">{t("payment.paypal.important")}</span>
                    </div>
                    <p className="text-sm">{t("payment.paypal.instructions")}</p>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <Label className="text-yellow-500">{t("payment.paypal.email")}:</Label>
                  <div className="p-3 bg-gray-800 rounded border font-mono flex items-center justify-between">
                    <span>payments@futurawatch.com</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard("payments@futurawatch.com")}
                      className="p-1 h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-yellow-500">{t("payment.paypal.amount")}:</Label>
                  <div className="p-3 bg-gray-800 rounded border text-2xl font-bold text-yellow-500">{plan.price}</div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={onClose} className="border-gray-700" disabled={isProcessing}>
                {t("payment.cancel")}
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : t("payment.confirm")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
